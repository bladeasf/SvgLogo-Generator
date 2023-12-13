import fs from 'fs';
import inquirer from 'inquirer';

async function run() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What's your first name?",
    },
    {
      type: 'list',
      name: 'shape',
      message: 'What shape should the logo be?',
      choices: ['rectangle', 'circle', 'triangle'],
    },
    {
      type: 'input',
      name: 'favoriteColor',
      message: 'What is your favorite color?',
    },
  ]);

  const svgLogo = generateSVGLogo(answers);
  console.log(svgLogo);


  fs.writeFileSync('circle.svg', svgLogo, 'utf-8');
  console.log('SVG saved to circle.svg');
}

function generateSVGLogo({ firstName, shape, favoriteColor }) {
  let svgTemplate;


  switch (shape) {
    case 'rectangle':
      svgTemplate = generateRectangle(firstName, favoriteColor);
      break;
    case 'circle':
      svgTemplate = generateCircle(firstName, favoriteColor);
      break;
    case 'triangle':
      svgTemplate = generateTriangle(firstName, favoriteColor);
      break;
    default:
      svgTemplate = generateRectangle(firstName, favoriteColor);
      break;
  }

  return svgTemplate;
}

function generateRectangle(firstName, favoriteColor) {
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${favoriteColor}" />
    <text x="20" y="90" font-family="Arial" font-size="20" fill="white">
      ${firstName}
    </text>
  </svg>`;
}

function generateCircle(firstName, favoriteColor) {
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="${favoriteColor}" />
    <text x="20" y="90" font-family="Arial" font-size="20" fill="white">
      ${firstName}
    </text>
  </svg>`;
}

function generateTriangle(firstName, favoriteColor) {
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,0 100,100 0,100" fill="${favoriteColor}" />
    <text x="20" y="90" font-family="Arial" font-size="20" fill="white">
      ${firstName}
    </text>
  </svg>`;
}

run();