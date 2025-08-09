export const model = {
  Score: 0,
  vpWidth: 1920,
  vpHeight: 1080,
  timeRemaining: 6.0,
  get timeBarSize() {
    return (this.vpWidth * this.timeRemaining) / 6.0;
  },
  message: "PRESS ENTER TO START",
  isMessageVisible: false,
};

export const template = `
<style> 
    @font-face {
        font-family: 'myFont';
        src: url('/Assets/fonts/KOMIKAP.ttf');
        font-weight: normal;
        font-style: normal;
    }

    canvas{ 
        position: fixed; 
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%);
    }
    
    .hud{
        position: fixed;
        width: \${vpWidth}px;
        height: \${vpHeight}px;
        top:50%;
        left:50%;
        transform: translate(-50% , -50%);
        font-family: myFont;
        padding-left: 25px;
        padding-top: 25px;
    }
    
    .message{
        position: fixed;
        width: 525px;
        height: 100px;
        top:50%;
        left:50%;
        transform: translate(-50% , -50%);
        text-align: center;
        color: white;
        font-size: 22px;
    }
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
    <div class='hud'>
        <div>
            <h1>Score: \${Score}</h1>
        </div>
        <div class='message' \${=== isMessageVisible}>
            <h1>\${message}</h1>
        </div>
        
    </div>
    
</div>`;

export function resizeUI(w: number, h: number) {
  model.vpWidth = w;
  model.vpHeight = h;
}

export function incrementScore() {
  model.Score++;
}

export function resetUI() {
  model.Score = 0;
  model.timeRemaining = 6.0;
}

export function showMessage(msg: string) {
  model.message = msg;
  model.isMessageVisible = true;
}

export function hideMessage() {
  model.isMessageVisible = false;
}

export function getScore() {
  return model.Score;
}
