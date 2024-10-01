
async function getPublicKey() {
    if (!window.nostr || typeof window.nostr.getPublicKey !== 'function') {
        throw new Error('Nostr is not available or not supported in this browser.');
    }
    return await window.nostr.getPublicKey();
}

async function signEvent(event) {
    if (!window.nostr || typeof window.nostr.signEvent !== 'function') {
        throw new Error('Nostr is not available or not supported in this browser.');
    }
    return await window.nostr.signEvent(event);
}

async function getRelays() {
    if (!window.nostr || typeof window.nostr.getRelays !== 'function') {
        throw new Error('Nostr is not available or not supported in this browser.');
    }
    return await window.nostr.getRelays();
}

async function encryptDM(pubkey, plaintext) {
    if (!window.nostr || typeof window.nostr.nip04.encrypt !== 'function') {
        throw new Error('Nostr is not available or not supported in this browser.');
    }
    return await window.nostr.nip04.encrypt(pubkey, plaintext);
}

async function decryptDM(pubkey, ciphertext) {
    if (!window.nostr || typeof window.nostr.nip04.decrypt !== 'function') {
        throw new Error('Nostr is not available or not supported in this browser.');
    }
    return await window.nostr.nip04.decrypt(pubkey, ciphertext);
}
