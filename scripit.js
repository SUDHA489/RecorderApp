class VoiceRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.stream = null;
        this.chunks = [];
        this.isRecording = false;

        this.recorderRef = document.querySelector("#recorder");
        this.playerRef = document.querySelector("#player");
        this.startRef = document.querySelector("#start");
        this.stopRef = document.querySelector("#stop");

        this.startRef.onclick = this.startRecording.bind(this);
        this.stopRef.onclick = this.stopRecording.bind(this);

        this.constraints = { audio: true, video: false };


        document.addEventListener('deviceready', this.checkPermissions.bind(this), false);
    }

    checkPermissions() {
        const permissions = cordova.plugins.permissions;

        const requiredPermissions = [
            permissions.RECORD_AUDIO,
            permissions.WRITE_EXTERNAL_STORAGE
        ];

        permissions.checkPermission(requiredPermissions, (status) => {
            if (!status.hasPermission) {
                permissions.requestPermissions(requiredPermissions, (status) => {
                    if (!status.hasPermission) {
                        console.error("Permissions not granted!");
                    } else {
                        console.log("Permissions granted");
                    }
                }, (error) => {
                    console.error("Permission request error:", error);
                });
            } else {
                console.log("Permissions already granted");
            }
        }, (error) => {
            console.error("Permission check error:", error);
        });
    }

    handleSuccess(stream) {
        this.stream = stream;
        this.recorderRef.srcObject = this.stream;
        this.recorderRef.play();

        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.ondataavailable = this.onMediaRecorderDataAvailable.bind(this);
        this.mediaRecorder.onstop = this.onMediaRecorderStop.bind(this);

        this.mediaRecorder.start();
    }

    handleError(error) {
        console.error("getUserMedia error:", error);
    }

    onMediaRecorderDataAvailable(e) {
        this.chunks.push(e.data);
    }

    onMediaRecorderStop() {
        const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
        const audioURL = window.URL.createObjectURL(blob);
        console.log("Audio URL:", audioURL);
        this.playerRef.src = audioURL;
        this.chunks = [];
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
        this.toggleUI(false);
    }

    startRecording() {
        if (this.isRecording) return;
        this.isRecording = true;
        this.toggleUI(true);

        navigator.mediaDevices
            .getUserMedia(this.constraints)
            .then(this.handleSuccess.bind(this))
            .catch(this.handleError.bind(this));
    }

    stopRecording() {
        if (!this.isRecording) return;
        this.isRecording = false;
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }

    toggleUI(isRecording) {
        if (isRecording) {
            this.startRef.classList.add('hidden');
            this.stopRef.classList.remove('hidden');
            this.playerRef.classList.add('hidden');
            document.querySelector('.title').classList.add('hidden');
        } else {
            this.startRef.classList.remove('hidden');
            this.stopRef.classList.add('hidden');
            this.playerRef.classList.remove('hidden');
            document.querySelector('.title').classList.remove('hidden');
        }
    }
}

window.voiceRecorder = new VoiceRecorder();
