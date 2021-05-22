from flask import Flask,Response,render_template
from p4 import start
import cv2
import base64

app = Flask(__name__)

def sendImage():
    
    cap = cv2.VideoCapture('video_one_sec.mp4')
    cnt=0
    while(cap.isOpened()):
        cnt+=1
        ret, img = cap.read()
        if ret == True :
            img=start(img)
            frame = cv2.imencode('.JPEG', img,[cv2.IMWRITE_JPEG_QUALITY,20])[1].tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            break
    
           


@app.route('/', methods=['GET', 'POST'])
def hello_world():
    return render_template("results.html")

@app.route('/results')
def runIt():
    return Response(sendImage(),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/home')
def myhome():
    return render_template("home.html")

@app.route('/score')
def myscore():
    return render_template("score.html")
    

if __name__ == "__main__":
    app.run(debug=True, port=8000,threaded=True)