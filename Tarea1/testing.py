import re
from spellchecker import SpellChecker

spell = SpellChecker()

def mispelledCounter(line):
    x = re.findall("[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9']*[]", line)
    counter = 0
    for word in x:
        if(spell.correction(word) != word):
            counter += 1 
    print(counter)


def splitData(data):
    lines = data.split('\n')
    #print(lines[4])
    linesArray = []
    for line in lines:
        linesArray.append(line.split(','))
    return linesArray

def countUppercase(line):
    total = 0 
    upperCase = 0
    for char in line:
        if not (char <= 'z' and char >= 'a' or char >= 'A' and char <= 'Z' or char == '\\'):
            total += 1
            print("--->" + char)
    return total

with open('data/Training1.csv', 'r',encoding='latin-1') as f:
    s1 = f.read()

mispelledCounter("some of this words are grong")

lines = splitData(s1)
f= open("countPunctuation.csv","w+")
# for line in lines:
#     #print(line)
#     f.write("%d\n" % countUppercase(line[0]))
#     print(countUppercase(line[1]))
f.close()



