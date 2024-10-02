document.addEventListener('DOMContentLoaded', async () => {
    const publicKeyDisplay = document.getElementById('publicKeyDisplay');

    try {
        const pubkey = await getPublicKey();
        publicKeyDisplay.textContent = `${pubkey}`;
    } catch (error) {
        console.error('Error:', error.message);
        publicKeyDisplay.textContent = `Error: ${error.message}`;
    }
});

let websocket;

document.getElementById('openBtn').addEventListener('click', () => {
    const wsUrl = document.getElementById('wsUrl').value;
    websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
        document.getElementById('wsStatus').textContent = 'Connected';
        console.log('WebSocket connection opened');
    };

    websocket.onmessage = (event) => {
        const wsMessages = document.getElementById('wsMessages');
        wsMessages.textContent += `\n${event.data}`;
    };

    websocket.onclose = () => {
        document.getElementById('wsStatus').textContent = 'Disconnected';
        console.log('WebSocket connection closed');
    };

    websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        document.getElementById('wsStatus').textContent = 'Error';
    };
});

document.getElementById('closeBtn').addEventListener('click', () => {
    if (websocket) {
        websocket.close();
    }
});

// ฟังก์ชัน hash ด้วย SHA-256 (คงเดิมจากที่คุณสร้างไว้)
async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// ส่ง form และสร้าง event (คงเดิมจากที่คุณสร้างไว้)
document.getElementById('nostrForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const responseDiv = document.getElementById('response');
    const content = document.getElementById('content').value;

    try {
        const pubkey = await getPublicKey();
        const nostrEvent = {
            id: 0,
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
            kind: 1,
            tags: [],
            content
        };

        const serializedEvent = JSON.stringify(nostrEvent);
        nostrEvent.id = await sha256(serializedEvent);

        console.log('Event with ID:', nostrEvent);

        const signedEvent = await signEvent(nostrEvent);
        console.log('Signed Event:', signedEvent);

        responseDiv.textContent = JSON.stringify(signedEvent, null, 2);

    } catch (error) {
        console.error('Error:', error.message);
        responseDiv.textContent = `Error: ${error.message}`;
    }
});
