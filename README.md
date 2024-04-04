# Nukemap Clone

This project aims to recreate the functionality of the [Nukemap](https://nuclearsecrecy.com/nukemap/) website using the OpenLayers Vue component provided in [ol-vue-example](https://github.com/Raruto/ol-vue-example/blob/master/src/components/DrawingControl.vue).

## Overview

The Nukemap Clone allows users to simulate nuclear explosions on a map by selecting a predetermined yield or specifying a custom yield in kilotons. The application then displays various blast radius circles, including the Fireball Circle, Heavy Blast Damage Circle, Radiation Circle, Moderate Blast Damage Circle, Thermal Radiation Circle, and Light Blast Damage Circle.

## Features

- Users can select a predetermined yield or input a custom yield in kilotons.
- Custom inputs, including the bomb name and kiloton yield, can be saved to a database via a Flask application.
- Blast radius circles are displayed on the map in different colors to represent different types of damage.
- The application provides an approximation of blast radius circles based on the input kiloton yield. Please note that the actual blast radius may vary due to numerous factors.

## How to Use

```bash
# Clone the repository
git clone https://github.com/your_username/nukemap-clone.git

# Install dependencies
npm install

# Run the Flask server
flask run

# Run the Vue development server
npm run serve
```
Open your browser and navigate to http://localhost:8080 to view the application.

## Technologies Used
- Vue.js
- OpenLayers
- Flask
- Axios

## Notes
- This project is for educational purposes only and provides approximate blast radius calculations. Actual blast radii may vary due to various factors not accounted for in the simulation.
- Contributions and feedback are welcome. Feel free to submit issues or pull requests.
- This project is inspired by the [Nukemap website](https://nuclearsecrecy.com/nukemap/) by Alex Wellerstein.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

