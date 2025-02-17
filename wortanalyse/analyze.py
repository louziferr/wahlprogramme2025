import nltk
import os
from tqdm import tqdm
import json

directory = 'wahlprogramme'
woerter = {}    # Dictionary mit Wörtern der Wahlprogramme

for file in os.listdir(directory):
    filename = os.fsdecode(file)
    if filename.endswith(".txt"):
        filepath = os.path.join(directory, filename)
        partei = filename[:-4]
        print(f"Zähle Wörter: Wahlprogramm: {partei.capitalize()}")
        # Wahlprogramm einlesen
        woerter[partei] = {}
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.lower()
                tokenized = nltk.word_tokenize(line, 'german')
                for word in tokenized:
                    if word in woerter[partei]:
                        woerter[partei][word] += 1
                    else:
                        woerter[partei][word] = 1
        
    with open(f'woerter_{partei}.json', 'w', encoding='utf-8') as f:
        json.dump(woerter[partei], f, ensure_ascii=False, indent=4)

with open('woerter.json', 'w', encoding='utf-8') as f:
    json.dump(woerter, f, ensure_ascii=False, indent=4)
