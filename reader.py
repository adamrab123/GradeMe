import cv2
import numpy as np
from matplotlib import pyplot as plt


def find_largest_polygon(img):
    """Finds the 4 extreme corners of the largest contour in the image."""
    threshold = cv2.threshold(img, 127, 255, 0)[1]
    

    contours, hierarchy = cv2.findContours(threshold, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    polygon = max(contours, key=cv2.contourArea)
    rect = cv2.minAreaRect(polygon)
    box = cv2.boxPoints(rect)
    box = np.int0(box)

    return box

def distance_between(p1, p2):
    """Returns the scalar distance between two points"""
    a = p2[0] - p1[0]
    b = p2[1] - p1[1]
    return np.sqrt((a ** 2) + (b ** 2))


def crop_and_warp(img, crop_rect, w, h):
    """Crops and warps a rectangular section from an image into a square of similar size."""

    src = crop_rect.astype(np.float32)


    # Describe a square with side of the calculated length, this is the new perspective we want to warp to
    dst = np.array([[0, w], [0, 0], [h, 0], [h, w], ]).astype(np.float32)

    # Gets the transformation matrix for skewing the image to fit a square by comparing the 4 before and after points
    m = cv2.getPerspectiveTransform(src, dst)

    # Performs the transformation on the original image
    return cv2.warpPerspective(img, m, (h, w))



filename = 'images/test.jpg'
image, extension = filename.split(".")

im = cv2.imread(filename)


im_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
paper_outline = find_largest_polygon(im_gray)
print(paper_outline)
im_gray = cv2.blur(im_gray, (3, 3))
w, h = im_gray.shape
im_gray = crop_and_warp(im_gray, paper_outline, w, h)
cv2.imwrite("warped.jpeg", im_gray)
im = crop_and_warp(im, paper_outline, w, h)


MIN_SCALE = 0.006
MAX_SCALE = 0.009


diag = np.sqrt(w**2 + h**2)
circles = cv2.HoughCircles(im_gray, cv2.HOUGH_GRADIENT, 1.05, 20, param1=50,
    param2=30, minRadius=int(MIN_SCALE*diag), maxRadius=int(MAX_SCALE*diag))
print(circles)


circles = np.round(circles[0, :]).astype(np.int32)
circles = sorted(circles, key = lambda x: x[1])

correct = {1: 'C', 2: 'D', 3: 'B', 4: 'A'}
mapping = {0:"A", 1:"B", 2:"C", 3:"D"}
res = dict()
intensities = []
locations = []
for (x, y, r) in circles:
    print(x,y,r)
    mask = np.zeros(im_gray.shape)
    # cv2.circle(im, (x, y), r, (0,255,0), 4)
    cv2.circle(mask, (x, y), r, 1, -1)
    intensity = np.mean(mask * im_gray)
    intensities.append(intensity)
    locations.append((intensity,x,y))
plt.imshow(im)

    


# num_questions = 4
# for i in range(num_questions):
#     print(intensities[4*i:4*i+4])
#     res[i+1] = mapping[np.argmin(intensities[4*i:4*i+4])]

outputName = image + "-circled" + "." + extension
print("writing to ", outputName)
#cv2.polylines(im, [np.array(paper_outline).astype(np.int32)], True, (255,0,0), 2)
cv2.imwrite(outputName, im)



# print(locations)
num_questions = 4
for i in range(num_questions):
    res[i+1] = [mapping[np.argmin(intensities[4*i:4*i+4])], np.min(intensities[4*i:4*i+4])]

print(res)
print(correct)


count = 0
for (userAnswer,(userAnswer,userIntensity)), elem in zip(res.items(), correct):
	answer = correct[elem]
	print(userAnswer, answer)

	if(userAnswer == answer):
		count += 1
		print('same', userIntensity)
		for intensity, x,y, in locations:
			if intensity == userIntensity:
				cv2.line(im, (x-100, y+25), (x-150, y-25), (0, 200, 20), 20)
				cv2.line(im, (x-100, y+25), (x-50, y-75), (0, 200, 20), 20)
	else:
		for intensity, x,y, in locations:
			if intensity == userIntensity:
				cv2.line(im, (x-150, y-25), (x-100, y+25), (0, 20, 200), 20)
				cv2.line(im, (x-100, y-25), (x-150, y+25), (0, 20, 200), 20)

print(count*25)
outputText = "{}%".format(count*25)
font = cv2.FONT_HERSHEY_SIMPLEX
cv2.putText(im, outputText, (200,450), font, 10, (255, 0, 0), 8, cv2.LINE_AA)
# for intensity, loc in locations:
    
# cv2.line(im, (202, 220), (800, 400), (0, 20, 200), 10)
# print(res)
if res  == correct:
    print('good')
# plt.imshow(im)
outputName = image + "-marked" + "." + extension
print("writing to ", outputName)


cv2.imwrite(outputName, im)
