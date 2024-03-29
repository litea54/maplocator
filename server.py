from flask import Flask, render_template

app = Flask(__name__, static_folder="build/_next", template_folder="build")


@app.route("/")
def hello():
    return render_template('index.html')


print('Starting Flask!')

if __name__ == '__main__':
    # app.debug = True
    app.run(host='0.0.0.0')
