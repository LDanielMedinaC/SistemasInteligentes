# with open("Testing.csv", "r", 'latin-1') as f:
#     lines = f.read()
#     lines = lines.split("\n")
#     for line in lines:
#         line.encode("windows-1252").decode("latin-1")
#         break
# import sys 
# import io

# f = "data/Testing.csv"

# tf = open(f)

# input_stream = io.TextIOWrapper(tf, encoding='latin-1')
# print(input_stream)
# # for line in input_stream:
# #     print(line)

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
    s1=f.read()

lines = splitData(s1)
f= open("countPunctuation.csv","w+")
for line in lines:
    #print(line)
    f.write("%d\n" % countUppercase(line[1]))
    print(countUppercase(line[1]))
f.close()



