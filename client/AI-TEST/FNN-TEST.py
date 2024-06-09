import tensorflow as tf
from tensorflow import keras
from keras.layers import Dense, Flatten, Embedding, Dropout
from keras.preprocessing.text import Tokenizer
import numpy as np

texts = [
    "boil water",
    "cut vegetables",
    "mix ingredients",
    "bake at 350°F for 30 minutes",
    "grill steak for 10 minutes on each side",
    "saute onions and garlic in olive oil",
    "whisk eggs and milk together",
    "season chicken with salt, pepper, and paprika",
    "fry bacon until crispy",
    "simmer tomato sauce for 20 minutes",
    "roast potatoes with rosemary",
    "blend strawberries and bananas for smoothie",
    "steam broccoli for 5 minutes",
    "preheat oven to 375°F",
    "cook pasta in boiling water",
    "slice onions thinly",
    "preheat grill to medium heat",
    "marinate chicken in teriyaki sauce",
    "dice tomatoes for salsa",
    "bake cookies at 350°F for 12 minutes",
    "grate cheese for pizza topping",
    "boil rice in salted water",
    "chop cilantro for garnish",
    "whip cream until stiff peaks form"
]


all_texts = texts 
tokenizer = Tokenizer()
tokenizer.fit_on_texts(all_texts)
vocab_size = len(tokenizer.word_index) + 1
embedding_dim = 10



model = tf.keras.Sequential([
    Embedding(input_dim=vocab_size, output_dim=embedding_dim),
    Flatten(),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(32, activation='relu'),
    Dropout(0.5),
    Dense(vocab_size, activation='softmax')
])

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam')

def generate_recipe(ingredients):
    generated_instructions = []
    for ingredient in ingredients:
        ingredient_seq = tokenizer.texts_to_sequences([ingredient])[0]
        generated_instructions.append(np.argmax(model.predict(np.array([ingredient_seq]))))
    return generated_instructions

# TESTING SCRIPT
user_input = input("Enter random ingredients separated by commas: ").split(',')
generated_instructions = generate_recipe(user_input)
print("Generated Recipe Instructions:")
for instruction_idx in generated_instructions:
    print(tokenizer.index_word[instruction_idx], end=' ')  
