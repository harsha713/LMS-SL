// Sample data for worksheets and books

const worksheets = [
  {
  "id": 1,
  "title": "Heat - MCQ Worksheet",
  "subject": "Science",
  "questions": [
    { "type": "mcq", question: "Which of the following conditions enables heat to flow from one body to another identical body?", options: ["The difference in the temperatures of the two bodies", "The difference in the pressures exerted on the two bodies", "The difference in the densities of the two bodies", "The difference in the sizes of the two bodies"], answer: "The difference in the temperatures of the two bodies" },

    { "type": "mcq", "question": "When you heat water in a pot, it boils. What can you infer from the above observation?", "options": ["Heat is a form of energy", "Water can boil by itself", "Water develops heat on its own", "Water is a universal solvent"], "answer": "Heat is a form of energy" },

    { "type": "mcq", "question": "What must be done to enable mercury in a glass thermometer to respond quickly to changes in temperature?", "options": ["The bore should be narrow", "The wall of stem should be thin", "The bulb should contain a lot of mercury", "The wall of glass bulb should be thin"], "answer": "The wall of glass bulb should be thin" },

    { "type": "mcq", "question": "Why do cooking vessels usually have copper bottoms?", "options": ["Copper has low melting point", "Copper is an insulator of heat", "Copper is a good conductor of heat", "Copper is cheap"], "answer": "Copper is a good conductor of heat" },

    { "type": "mcq", "question": "For the effective radiation of heat by an electric room heater, which of the following needs to be done?", "options": ["Keep it clean", "Polish it to shine", "Paint it green", "Paint it black"], "answer": "Polish it to shine" },

    { "type": "mcq", "question": "What is the measure of the degree of hotness or coldness of a body called?", "options": ["Heat energy", "Celsius", "Kelvin", "Temperature"], "answer": "Temperature" },

    { "type": "mcq", "question": "Why are two thin blankets piled together warmer than a single one of the same total thickness as the two?", "options": ["Air is enclosed in between them", "The outer thin blanket transfers heat faster", "Air acts as medium to transfer the energy", "There is a decrease in the sensation of touch"], "answer": "Air is enclosed in between them" },

    { "type": "mcq", "question": "Conduction of heat does not take place in", "options": ["Copper", "Iron", "Aluminium", "Vacuum"], "answer": "Vacuum" },

    { "type": "mcq", "question": "Why are asbestos sheets used for laying the roofs of some houses?", "options": ["They are good conductors of heat", "They are bad conductors of heat", "They are costly", "They have nice look"], "answer": "They are bad conductors of heat" },

    { "type": "mcq", "question": "Why is mercury widely used in clinical thermometers?", "options": ["Only (i) and (ii)", "Only (ii) and (iii)", "Only (i) and (iii)", "(i), (ii) and (iii)"], "answer": "(i), (ii) and (iii)" },

    { "type": "mcq", "question": "Why is it hotter over the top of a fire than at the same distance on the sides?", "options": ["Due to convection of heat", "Due to conduction of heat", "Due to radiation of heat", "Due to conduction, convection and radiation of heat"], "answer": "Due to convection of heat" },

    { "type": "mcq", "question": "Which of the following is NOT a scale of temperature?", "options": ["Kelvin scale", "Celsius scale", "Fahrenheit scale", "Richter scale"], "answer": "Richter scale" },

    { "type": "mcq", "question": "How many parts does a Celsius scale have?", "options": ["100", "273", "180", "50"], "answer": "100" },

    { "type": "mcq", "question": "What is the range of a clinical thermometer?", "options": ["0°C − 100°C", "32°F − 214°F", "0°C − 273°C", "35°C − 42°C"], "answer": "35°C − 42°C" },

    { "type": "mcq", "question": "Identify the normal human body temperature.", "options": ["32°F", "212°F", "100.4°F", "98.4°F"], "answer": "98.4°F" },

    { "type": "mcq", "question": "'X' is the mode of transmission of heat that takes place by the movement of hot particles. Identify ‘X’.", "options": ["Conduction", "Convection", "Radiation", "Expansion"], "answer": "Convection" },

    { "type": "mcq", "question": "By which mode of transmission of heat does air get heated up?", "options": ["Conduction", "Convection", "Radiation", "Diffusion"], "answer": "Convection" },

    { "type": "mcq", "question": "In cold countries, why are steam pipes covered with asbestos or glass wool?", "options": ["To prevent bursting due to expansion", "To prevent heat loss due to conduction", "To prevent radiation", "All of the above"], "answer": "To prevent heat loss due to conduction" },

    { "type": "mcq", "question": "Windows having double glass panes with some space between them is called double glazing. Why do windows in cold countries have double glazing?", "options": ["For the conduction of heat", "For the insulation of heat", "For the radiation of heat", "All of the above"], "answer": "For the insulation of heat" },

    { "type": "mcq", "question": "Which of these phenomena is caused due to convection?", "options": ["Ventilation", "Trade winds", "Ocean currents", "All of the above"], "answer": "All of the above" },

    { "type": "mcq", "question": "Which of the following is a good conductor of heat?", "options": ["Plastic", "Water", "Glass", "Copper"], "answer": "Copper" },

    { "type": "mcq", "question": "What is the mode by which heat is transferred in solid substances?", "options": ["Conduction", "Convection", "Radiation", "Insulation"], "answer": "Conduction" },

    { "type": "mcq", "question": "Which of the following is a bad conductor of heat?", "options": ["Wood", "Aluminium", "Iron", "Bronze"], "answer": "Wood" },

    { "type": "mcq", "question": "When two objects are in thermal contact, how is the heat from one body to the other body transferred?", "options": ["Conduction", "Convection", "Radiation", "Insulation"], "answer": "Conduction" },

    { "type": "mcq", "question": "How is heat conducted in solids?", "options": ["From a high pressure to a low pressure region", "From a colder to a hotter region", "From a hotter to a colder region", "From a low pressure to a high pressure region"], "answer": "From a hotter to a colder region" },

    { "type": "mcq", "question": "Which is the best conductor of heat?", "options": ["Silver", "Iron", "Aluminium", "Copper"], "answer": "Silver" },

    { "type": "mcq", "question": "Why are tea cups never made of metals?", "options": ["Metals are good conductors of heat", "Metals are lustrous", "Metals are expensive", "Metals have high melting point"], "answer": "Metals are good conductors of heat" },

    { "type": "mcq", "question": "In which of the following is the rate of heat transfer more?", "options": ["Glass", "Copper", "Plastic", "Wood"], "answer": "Copper" },

    { "type": "mcq", "question": "Rooms are fitted with ventilators to let hot air out. What is the phenomenon involved?", "options": ["Conduction", "Convection", "Radiation", "Condensation"], "answer": "Convection" },

    { "type": "mcq", "question": "What enables birds to glide effortlessly in the air?", "options": ["Conduction of heat in the air", "Radiation through the atmosphere", "Convection currents of air", "More sugar in their body cells"], "answer": "Convection currents of air" },

    { "type": "mcq", "question": "When we touch a steel rod and a sheet of paper simultaneously, why do we feel steel colder?", "options": ["Steel, being a good conductor, absorbs heat from our body", "Paper being a good conductor absorbs more heat", "Heat flows from steel to our body", "Heat flows from the paper to our body"], "answer": "Steel, being a good conductor, absorbs heat from our body" },

    { "type": "mcq", "question": "What is the energy conversion taking place in an electric heater?", "options": ["Chemical → Electrical", "Electrical → Chemical", "Heat → Electrical", "Electrical → Heat"], "answer": "Electrical → Heat" },

    { "type": "mcq", "question": "Which of the following statements is true about convection?", "options": ["In solids, heat is transferred only by convection", "Convection occurs in cold liquids", "Convection requires a medium for transmission", "Heat flows from cold end to hot end"], "answer": "Convection requires a medium for transmission" },

    { "type": "mcq", "question": "How should the surfaces of a heat-absorbing storage box be coloured?", "options": ["Outer - Silver, Inner - Silver", "Outer - Black, Inner - Black", "Outer - Silver, Inner - Black", "Outer - Black, Inner - Silver"], "answer": "Outer - Black, Inner - Silver" },

    { "type": "mcq", "question": "Which part of a thermos flask prevents heat loss through radiation?", "options": ["Vacuum", "Cork stopper", "Double glass walls", "Shiny/silvery wall"], "answer": "Shiny/silvery wall" },

    { "type": "mcq", "question": "What happens when the temperature of a substance is increased?", "options": ["Kinetic energy increases", "Kinetic energy decreases", "Amplitude of molecular vibration decreases", "No change"], "answer": "Kinetic energy increases" },

    { "type": "mcq", "question": "What is temperature?", "options": ["The rate of expansion of an object", "The loss of heat energy", "The volume of a gas occupied", "The degree of hotness or coldness of a body"], "answer": "The degree of hotness or coldness of a body" },

    { "type": "mcq", "question": "Why do solar panels have black surfaces?", "options": ["Because they are good absorbers of heat", "Because they are bad absorbers", "Because they reflect heat", "Because they are bad radiators"], "answer": "Because they are good absorbers of heat" },

    { "type": "mcq", "question": "Tea remains warm longer in which cup?", "options": ["Silver cup", "Aluminium cup", "Wooden cup", "Copper cup"], "answer": "Wooden cup" },

    { "type": "mcq", "question": "The base of a cooking vessel is usually black and dull because:", "options": ["Black is a favourite colour", "Dull surface prevents slipping", "Black and dull surfaces are good absorbers of heat", "Black and dull surfaces are good reflectors of heat"], "answer": "Black and dull surfaces are good absorbers of heat" }
  ]
},
  {
    id: 2,
    title: "Science Worksheet - Class 4",
    subject: "Science",
    questions: [
      { type: "mcq", question: "What is the color of the sky?", options: ["Red", "Blue", "Green", "Yellow"], answer: "blue" },
      { type: "text", question: "What do plants need to grow?", answer: "water" }
    ]
  }
];

const books = [
  {
    id: 1,
    title: "The Adventures of Little Explorer",
    summary: "Join Little Explorer on exciting journeys around the world, learning about different cultures and places.",
    whatYouLearn: "Geography, cultures, and the importance of curiosity.",
    cover: "placeholder.jpg" // Placeholder for book cover
  }
];

const quizQuestions = [
  {
    question: "What is the capital of France?",
    type: "mcq",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "How many continents are there?",
    type: "mcq",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "What is 5 + 3?",
    type: "text",
    answer: "8"
  }
];
