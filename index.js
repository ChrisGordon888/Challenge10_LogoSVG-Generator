import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for your logo:',
      validate: function (value) {
        const valid = value.length <= 3;
        return valid || 'Please enter up to three characters.';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (e.g. "red" or "#ff0000"):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape for your logo:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (e.g. "blue" or "#0000ff"):',
    },
];

function createShapeSvg(shape, color, logoText, textColor) {
    switch(shape) {
        case 'circle':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                <circle cx="50%" cy="50%" r="50%" fill="${color}"/>
                <text x="50%" y="50%" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" font-size="60">${logoText}</text>
            </svg>`;
        case 'triangle':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                <polygon points="100,10 190,190 10,190" fill="${color}"/>
                <text x="50%" y="50%" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" font-size="60">${logoText}</text>
            </svg>`;
        case 'square':
        default:
            return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                <rect width="100%" height="100%" fill="${color}"/>
                <text x="50%" y="50%" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" font-size="60">${logoText}</text>
            </svg>`;
    }
}

inquirer.prompt(questions).then((answers) => {
    const logoText = answers.text;
    const textColor = answers.textColor;
    const shape = answers.shape;
    const shapeColor = answers.shapeColor;

    const svgTemplate = createShapeSvg(shape, shapeColor, logoText, textColor);

    fs.writeFile('logo.svg', svgTemplate, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
});