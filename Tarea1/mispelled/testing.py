import re
from spellchecker import SpellChecker

spell = SpellChecker()

def mispelledCounter(line):
    x = re.split("[ \t\n,\.?\"]", line)
    counter = 0
    #print("---->" + str(len(x)))
    for word in x:
        if(len(word) == 0):
            continue
        if(not re.match(".*[a-zA-Z].*",word)):
            continue
        #print(word)
        if(spell.correction(word) != word):
            counter += 1 
    #print(counter)
    return counter


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

lines = splitData(s1)
#x = mispelledCounter("this iz m1 testing   tnx")
f= open("countingMispelled.csv","w+")
iterlines = iter(lines)
next(iterlines)
for line in iterlines:
    f.write("%d\n" % mispelledCounter(line[0]))
    #print(countUppercase(line[1]))
f.close()



