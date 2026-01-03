const fallbackQuizzes = {
    "General Knowledge": [
        {
            "id": 1,
            "question": "Which is the largest coffee producing state of India?",
            "options": ["Kerala", "Tamil Nadu", "Karnataka", "Arunachal Pradesh"],
            "answer": "Karnataka",
            "explanation": "Karnataka is the largest coffee producing state in India, accounting for nearly 71% of total production."
        },
        {
            "id": 2,
            "question": "The 'Havelock Island' in Andaman and Nicobar was renamed as?",
            "options": ["Shaheed Dweep", "Swaraj Dweep", "Netaji Subhash Chandra Bose Dweep", "Veer Savarkar Dweep"],
            "answer": "Swaraj Dweep",
            "explanation": "Havelock Island was renamed as Swaraj Dweep by PM Narendra Modi on December 30, 2018."
        },
        {
            "id": 3,
            "question": "Which state has the largest coastline in India?",
            "options": ["Andhra Pradesh", "Gujarat", "Tamil Nadu", "Maharashtra"],
            "answer": "Gujarat",
            "explanation": "Gujarat has the longest coastline in India, covering approximately 1,600 km."
        },
        {
            "id": 4,
            "question": "Who was the first Chief Election Commissioner of India?",
            "options": ["T.N. Seshan", "Sukumar Sen", "V.S. Ramadevi", "K.V.K. Sundaram"],
            "answer": "Sukumar Sen",
            "explanation": "Sukumar Sen was the first Chief Election Commissioner of India, serving from 1950 to 1958."
        },
        {
            "id": 5,
            "question": "The term 'Bully' is connected with which sport?",
            "options": ["Cricket", "Hockey", "Badminton", "Tennis"],
            "answer": "Hockey",
            "explanation": "The term 'Bully' is used in Field Hockey to restart play."
        },
        {
            "id": 6,
            "question": "The National Song of India was composed by?",
            "options": ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sri Aurobindo", "Sarat Chandra Chattopadhyay"],
            "answer": "Bankim Chandra Chatterjee",
            "explanation": "The National Song 'Vande Mataram' was composed by Bankim Chandra Chatterjee."
        },
        {
            "id": 7,
            "question": "Which is the oldest stock exchange in Asia?",
            "options": ["Bombay Stock Exchange", "Tokyo Stock Exchange", "Shanghai Stock Exchange", "Hong Kong Stock Exchange"],
            "answer": "Bombay Stock Exchange",
            "explanation": "The Bombay Stock Exchange (BSE) is the oldest stock exchange in Asia, established in 1875."
        },
        {
            "id": 8,
            "question": "Where is the headquarters of ISRO located?",
            "options": ["New Delhi", "Mumbai", "Bengaluru", "Chennai"],
            "answer": "Bengaluru",
            "explanation": "The headquarters of the Indian Space Research Organisation (ISRO) is located in Bengaluru."
        },
        {
            "id": 9,
            "question": "Who is known as the 'Missile Man of India'?",
            "options": ["Vikram Sarabhai", "Homi J. Bhabha", "A.P.J. Abdul Kalam", "Satish Dhawan"],
            "answer": "A.P.J. Abdul Kalam",
            "explanation": "Dr. A.P.J. Abdul Kalam is popularly known as the Missile Man of India for his work on ballistic missile technology."
        },
        {
            "id": 10,
            "question": "The classical dance 'Sattriya' belongs to which state?",
            "options": ["Manipur", "Odisha", "Assam", "Kerala"],
            "answer": "Assam",
            "explanation": "Sattriya is a classical dance form that originated in the state of Assam."
        }
    ],
    "History": [
        {
            "id": 1,
            "question": "Who was the first Governor-General of India?",
            "options": ["Lord Canning", "Lord Mountbatten", "Lord William Bentinck", "C. Rajagopalachari"],
            "answer": "Lord William Bentinck",
            "explanation": "Lord William Bentinck was the first Governor-General of India (1833)."
        },
        {
            "id": 2,
            "question": "The Battle of Plassey was fought in which year?",
            "options": ["1757", "1764", "1857", "1761"],
            "answer": "1757",
            "explanation": "The Battle of Plassey was fought on June 23, 1757."
        },
        {
            "id": 3,
            "question": "Who founded the Maurya Empire?",
            "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Kanishka"],
            "answer": "Chandragupta Maurya",
            "explanation": "Chandragupta Maurya founded the Maurya Empire in 322 BCE."
        },
        {
            "id": 4,
            "question": "The 'Quit India Movement' was launched in which year?",
            "options": ["1920", "1930", "1942", "1947"],
            "answer": "1942",
            "explanation": "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942."
        },
        {
            "id": 5,
            "question": "Who was known as the 'Iron Man of India'?",
            "options": ["Subhash Chandra Bose", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Bhagat Singh"],
            "answer": "Sardar Vallabhbhai Patel",
            "explanation": "Sardar Vallabhbhai Patel is known as the Iron Man of India for his role in integrating princely states."
        },
        {
            "id": 6,
            "question": "Which Mughal emperor built the Taj Mahal?",
            "options": ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
            "answer": "Shah Jahan",
            "explanation": "Shah Jahan built the Taj Mahal in memory of his wife Mumtaz Mahal."
        },
        {
            "id": 7,
            "question": "Who wrote 'Discovery of India'?",
            "options": ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Indira Gandhi"],
            "answer": "Jawaharlal Nehru",
            "explanation": "The Discovery of India was written by Pandit Jawaharlal Nehru."
        },
        {
            "id": 8,
            "question": "The Indus Valley Civilization port city was?",
            "options": ["Harappa", "Mohenjo-Daro", "Lothal", "Kalibangan"],
            "answer": "Lothal",
            "explanation": "Lothal was a major port city of the Indus Valley Civilization."
        },
        {
            "id": 9,
            "question": "Who was the founder of the Gupta Empire?",
            "options": ["Chandragupta I", "Sri Gupta", "Samudragupta", "Kumaragupta"],
            "answer": "Sri Gupta",
            "explanation": "Sri Gupta is considered the founder of the Gupta Empire."
        },
        {
            "id": 10,
            "question": "The Jallianwala Bagh massacre took place in?",
            "options": ["1919", "1920", "1921", "1922"],
            "answer": "1919",
            "explanation": "The Jallianwala Bagh massacre occurred on April 13, 1919."
        }
    ],
    "Science": [
        {
            "id": 1,
            "question": "What is the chemical symbol for Gold?",
            "options": ["Ag", "Au", "Fe", "Hg"],
            "answer": "Au",
            "explanation": "The chemical symbol for Gold is Au (from Latin: Aurum)."
        },
        {
            "id": 2,
            "question": "Which constant is represented by 'c' in physics?",
            "options": ["Speed of Sound", "Planck's Constant", "Speed of Light", "Gravitational Constant"],
            "answer": "Speed of Light",
            "explanation": "In physics, 'c' represents the speed of light in a vacuum (~3x10^8 m/s)."
        },
        {
            "id": 3,
            "question": "What is the powerhouse of the cell?",
            "options": ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
            "answer": "Mitochondria",
            "explanation": "Mitochondria are known as the powerhouse of the cell."
        },
        {
            "id": 4,
            "question": "Which gas is most abundant in the Earth's atmosphere?",
            "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
            "answer": "Nitrogen",
            "explanation": "Nitrogen makes up about 78% of the Earth's atmosphere."
        },
        {
            "id": 5,
            "question": "What is the unit of electric current?",
            "options": ["Volt", "Watt", "Ampere", "Ohm"],
            "answer": "Ampere",
            "explanation": "The SI unit of electric current is the Ampere (A)."
        },
        {
            "id": 6,
            "question": "Who discovered Penicillin?",
            "options": ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Edward Jenner"],
            "answer": "Alexander Fleming",
            "explanation": "Alexander Fleming discovered Penicillin in 1928."
        },
        {
            "id": 7,
            "question": "What is the hardest natural substance on Earth?",
            "options": ["Gold", "Iron", "Diamond", "Platinum"],
            "answer": "Diamond",
            "explanation": "Diamond is the hardest known natural material."
        },
        {
            "id": 8,
            "question": "Which planet is known as the Red Planet?",
            "options": ["Venus", "Mars", "Jupiter", "Saturn"],
            "answer": "Mars",
            "explanation": "Mars is known as the Red Planet due to iron oxide on its surface."
        },
        {
            "id": 9,
            "question": "What is the main constituent of Biogas?",
            "options": ["Methane", "Propane", "Butane", "Ethane"],
            "answer": "Methane",
            "explanation": "Methane (CH4) is the primary constituent of Biogas."
        },
        {
            "id": 10,
            "question": "Which Vitamin is produced by sunlight?",
            "options": ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin B12"],
            "answer": "Vitamin D",
            "explanation": "The skin produces Vitamin D when exposed to sunlight."
        }
    ],
    "Indian Polity": [
        {
            "id": 1,
            "question": "Who is the custodian of the Constitution of India?",
            "options": ["President", "Prime Minister", "Supreme Court", "Parliament"],
            "answer": "Supreme Court",
            "explanation": "The Supreme Court of India is the custodian and interpreter of the Constitution."
        },
        {
            "id": 2,
            "question": "Article 370 was related to which state?",
            "options": ["Sikkim", "Jammu & Kashmir", "Nagaland", "Arunachal Pradesh"],
            "answer": "Jammu & Kashmir",
            "explanation": "Article 370 granted special status to Jammu & Kashmir (abrogated in 2019)."
        },
        {
            "id": 3,
            "question": "Who appoints the Chief Justice of India?",
            "options": ["Prime Minister", "President", "Law Minister", "Lok Sabha Speaker"],
            "answer": "President",
            "explanation": "The President of India appoints the Chief Justice of India."
        },
        {
            "id": 4,
            "question": "The concept of 'Fundamental Rights' was borrowed from?",
            "options": ["UK", "USA", "Canada", "Ireland"],
            "answer": "USA",
            "explanation": "Fundamental Rights in the Indian Constitution were borrowed from the USA."
        },
        {
            "id": 5,
            "question": "What is the maximum gap allowed between two sessions of Parliament?",
            "options": ["3 months", "4 months", "6 months", "1 year"],
            "answer": "6 months",
            "explanation": "The maximum gap between two sessions of Parliament cannot exceed 6 months."
        },
        {
            "id": 6,
            "question": "The Panchayati Raj System was first adopted by which state?",
            "options": ["Rajasthan", "Andhra Pradesh", "Karnataka", "Gujarat"],
            "answer": "Rajasthan",
            "explanation": "Rajasthan was the first state to adopt the Panchayati Raj system in 1959."
        },
        {
            "id": 7,
            "question": "Who governs a Union Territory?",
            "options": ["Chief Minister", "President", "Governor", "Administrator/Lt. Governor"],
            "answer": "Administrator/Lt. Governor",
            "explanation": "Union Territories are governed by the President through an Administrator or Lt. Governor."
        },
        {
            "id": 8,
            "question": "The Preamble was amended by which Amendment Act?",
            "options": ["42nd", "44th", "73rd", "86th"],
            "answer": "42nd",
            "explanation": "The Preamble was amended by the 42nd Amendment Act, 1976."
        },
        {
            "id": 9,
            "question": "Minimum age to become a member of Lok Sabha is?",
            "options": ["21", "25", "30", "35"],
            "answer": "25",
            "explanation": "The minimum age to contest Lok Sabha elections is 25 years."
        },
        {
            "id": 10,
            "question": "Which article deals with the 'Right to Education'?",
            "options": ["Article 21", "Article 21A", "Article 19", "Article 45"],
            "answer": "Article 21A",
            "explanation": "Article 21A guarantees the Right to Education for children aged 6-14."
        }
    ],
    "Geography": [
        {
            "id": 1,
            "question": "Which river is known as the 'Sorrow of Bihar'?",
            "options": ["Ganga", "Kosi", "Son", "Gandak"],
            "answer": "Kosi",
            "explanation": "The Kosi river is known as the Sorrow of Bihar due to its frequent floods."
        },
        {
            "id": 2,
            "question": "Which is the highest peak in India (wholly in India)?",
            "options": ["K2", "Kangchenjunga", "Nanda Devi", "Kamet"],
            "answer": "Kangchenjunga",
            "explanation": "Kangchenjunga is the highest mountain peak located wholly within India."
        },
        {
            "id": 3,
            "question": "The 'Ring of Fire' is associated with which ocean?",
            "options": ["Atlantic", "Indian", "Pacific", "Arctic"],
            "answer": "Pacific",
            "explanation": "The Ring of Fire is a major area in the basis of the Pacific Ocean with many earthquakes and volcanoes."
        },
        {
            "id": 4,
            "question": "Which soil is best for cotton cultivation?",
            "options": ["Alluvial", "Red", "Black (Regur)", "Laterite"],
            "answer": "Black (Regur)",
            "explanation": "Black soil (Regur soil) is most suitable for cotton cultivation."
        },
        {
            "id": 5,
            "question": "Which is the largest freshwater lake in India?",
            "options": ["Chilika", "Wular", "Sambhar", "Dal"],
            "answer": "Wular",
            "explanation": "Wular Lake in Jammu & Kashmir is the largest freshwater lake in India."
        },
        {
            "id": 6,
            "question": "Where is the Sundarbans National Park located?",
            "options": ["Odisha", "West Bengal", "Assam", "Karnataka"],
            "answer": "West Bengal",
            "explanation": "Sundarbans National Park is located in West Bengal, famous for Royal Bengal Tigers."
        },
        {
            "id": 7,
            "question": "Which planet is closest to the Sun?",
            "options": ["Venus", "Mercury", "Mars", "Earth"],
            "answer": "Mercury",
            "explanation": "Mercury is the closest planet to the Sun."
        },
        {
            "id": 8,
            "question": "The Palk Strait separates India from?",
            "options": ["Pakistan", "Maldives", "Sri Lanka", "Bangladesh"],
            "answer": "Sri Lanka",
            "explanation": "The Palk Strait separates India and Sri Lanka."
        },
        {
            "id": 9,
            "question": "Which Indian state has the highest forest cover area-wise?",
            "options": ["Arunachal Pradesh", "Madhya Pradesh", "Chhattisgarh", "Odisha"],
            "answer": "Madhya Pradesh",
            "explanation": "Madhya Pradesh has the largest forest cover in India by area."
        },
        {
            "id": 10,
            "question": "What is the capital of Lakshadweep?",
            "options": ["Port Blair", "Kavaratti", "Silvassa", "Daman"],
            "answer": "Kavaratti",
            "explanation": "Kavaratti is the capital of the Union Territory of Lakshadweep."
        }
    ],
    "Mixed Bag": [
        {
            "id": 1,
            "question": "Who invented the telephone?",
            "options": ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Marconi"],
            "answer": "Alexander Graham Bell",
            "explanation": "Alexander Graham Bell is credited with inventing the first practical telephone."
        },
        {
            "id": 2,
            "question": "Which is the longest river in the world?",
            "options": ["Amazon", "Nile", "Yangtze", "Mississippi"],
            "answer": "Nile",
            "explanation": "The Nile is generally considered the longest river in the world."
        },
        {
            "id": 3,
            "question": "Who wrote the Indian National Anthem?",
            "options": ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Subhash Chandra Bose", "Sarojini Naidu"],
            "answer": "Rabindranath Tagore",
            "explanation": "Rabindranath Tagore wrote 'Jana Gana Mana', the National Anthem of India."
        },
        {
            "id": 4,
            "question": "What is the boiling point of water?",
            "options": ["50°C", "100°C", "150°C", "200°C"],
            "answer": "100°C",
            "explanation": "The boiling point of water is 100 degrees Celsius at standard atmospheric pressure."
        },
        {
            "id": 5,
            "question": "Which animal is known as the 'Ship of the Desert'?",
            "options": ["Elephant", "Horse", "Camel", "Yak"],
            "answer": "Camel",
            "explanation": "Camels are called Ships of the Desert because they are well-adapted to desert travel."
        },
        {
            "id": 6,
            "question": "Who is the current Prime Minister of India?",
            "options": ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Manmohan Singh"],
            "answer": "Narendra Modi",
            "explanation": "Narendra Modi is the current Prime Minister of India (as of 2024)."
        },
        {
            "id": 7,
            "question": "Which gas do plants absorb during photosynthesis?",
            "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            "answer": "Carbon Dioxide",
            "explanation": "Plants absorb Carbon Dioxide (CO2) from the air during photosynthesis."
        },
        {
            "id": 8,
            "question": "What is the currency of Japan?",
            "options": ["Yuan", "Won", "Yen", "Dollar"],
            "answer": "Yen",
            "explanation": "The Yen is the official currency of Japan."
        },
        {
            "id": 9,
            "question": "Who painted the Mona Lisa?",
            "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            "answer": "Leonardo da Vinci",
            "explanation": "Leonardo da Vinci painted the Mona Lisa."
        },
        {
            "id": 10,
            "question": "How many states are there in India?",
            "options": ["28", "29", "27", "30"],
            "answer": "28",
            "explanation": "There are 28 states and 8 Union Territories in India."
        }
    ]
};

module.exports = fallbackQuizzes;
