import '../style/style.css';
import io from 'socket.io-client';
import { url } from '../config';

(function () {

    const btn1Element = document.getElementById('btn1-light');
    const btn2Element = document.getElementById('btn2-light');
    const span1Element = document.getElementById('span-1');
    const span2Element = document.getElementById('span-2');
    span1Element.innerHTML = "Off"
    span2Element.innerHTML = "Off"
    
    let state_l1 = false; 
    let state_l2 = false; 

    const toggle = (light) => {
        if (light === 'l1') {
            span1Element.innerHTML = state_l1 ? 'On' : 'Off'
            socket.emit(`led1:${state_l1 ? 'on' : 'off'}`)
        }else{
            span2Element.innerHTML = state_l2 ? 'On' : 'Off'
            socket.emit(`led2:${state_l2 ? 'on' : 'off'}`)
        }
    };

    const socket = io.connect(url);
    console.log(url)

    socket.emit('led1:off');
    socket.emit('led2:off');

    btn1Element.addEventListener('click', ()=> {
        state_l1 = !state_l1
        span1Element.innerHTML = state_l1 ? 'On' : 'Off'
        socket.emit('led1:off');
        toggle('l1')
    });
    btn2Element.addEventListener('click', ()=> {
        state_l2 = !state_l2
        span2Element.innerHTML = state_l2 ? 'On' : 'Off'
        socket.emit('led2:off');
        toggle('l2')
    });

    socket.on('led1:on', () => {
        console.log('Received: on');
    });
    socket.on('btn01', (data)=>{ 
        state_l1 = !state_l1
        btn1Element.checked = state_l1
        toggle('l1')
    })
    socket.on('btn02', (data)=>{ 
        state_l2 = !state_l2
        btn2Element.checked = state_l2
        toggle('l2')
    })
    socket.on('led1:off', () => {
        console.log('Received: off');
    });
}

)();
