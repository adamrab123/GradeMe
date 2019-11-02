import cv2
import numpy as np
from matplotlib import pyplot as plt


im = cv2.imread('test.jpeg')

im_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
im_gray = cv2.blur(im_gray, (3, 3))


w, h = im_gray.shape
circles = cv2.HoughCircles(im_gray, cv2.HOUGH_GRADIENT, 1.05, 20, param1 = 50,
    param2 = 30, minRadius = 25, maxRadius = 40)



circles = np.round(circles[0, :]).astype(np.int32)
circles = sorted(circles, key = lambda x: x[1])

mapping = {0:"A", 1:"B", 2:"C", 3:"D"}
res = dict()
intensities = []
for (x, y, r) in circles:
    print(x,y,r)
    mask = np.zeros(im_gray.shape)
    cv2.circle(im, (x, y), r, (0,255,0), 4)
    cv2.circle(mask, (x, y), r, 1, -1)
    intensity = np.mean(mask * im_gray)
    intensities.append(intensity)


num_questions = 4
for i in range(num_questions):
    print(intensities[4*i:4*i+4])
    res[i+1] = mapping[np.argmin(intensities[4*i:4*i+4])]



print(res)

cv2.imwrite("ans.jpeg", mask)