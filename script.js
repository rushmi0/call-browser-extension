document.addEventListener('DOMContentLoaded', async () => {
    const publicKeyDisplay = document.getElementById('publicKeyDisplay');

    try {
        const pubkey = await getPublicKey();
        publicKeyDisplay.textContent = `Your Public Key: ${pubkey}`;
    } catch (error) {
        console.error('Error:', error.message);
        publicKeyDisplay.textContent = `Error: ${error.message}`;
    }
});

document.getElementById('nostrForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const responseDiv = document.getElementById('response');
    const content = document.getElementById('content').value;

    try {
        const pubkey = await getPublicKey();
        const nostrEvent = {
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
            kind: 1,
            tags: [],
            content
        };
        console.log(nostrEvent)

        const signedEvent = await signEvent(nostrEvent);
        console.log(signedEvent);

        responseDiv.textContent = JSON.stringify(signedEvent, null, 2);

    } catch (error) {
        console.error('Error:', error.message);
        responseDiv.textContent = `Error: ${error.message}`;
    }
});
