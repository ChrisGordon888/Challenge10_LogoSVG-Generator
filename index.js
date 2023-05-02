import inquirer from 'inquirer';
import svgCaptcha from 'svg-captcha';
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

  inquirer.prompt(questions).then((answers) => {
    const logoText = answers.text;
    const textColor = answers.textColor;
    const shape = answers.shape;
    const shapeColor = answers.shapeColor;

    const captcha = svgCaptcha.create({
      size: 6, // Number of characters in the captcha text
      noise: 2, // Number of noise lines to add
      color: true, // Whether to randomize the color of the text
      background: shapeColor, // Use the user's chosen shape color as the background color
      fontSize: 64, // Size of the font used in the captcha text
    });

    const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <rect width="100%" height="100%" fill="${shapeColor}"/>
      <text x="50%" y="50%" fill="${textColor}" text-anchor="middle" font-size="60">${logoText}</text>
    </svg>`;

    fs.writeFile('logo.svg', svgTemplate, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
});