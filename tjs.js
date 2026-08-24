const TorrentWrapper = Object()
TorrentWrapper.client_link = (host="127.0.0.1", port=9191, t="mytorrents") => {
    return `http://${host}:${port}/${t}/rpc/`;
}
TorrentWrapper.add = async () => {
    const res = await fetch(TorrentWrapper.client_link(), {
        method: "POST",
        body: JSON.stringify({ 'method': 'torrent-add', 'arguments': { 'metainfo': b64metainfo } }),
                            headers: { 'Content-Type': 'application/json' }
    });
    return res.json()
}

TorrentWrapper.remove = async () => {
    const res= await fetch(TorrentWrapper.client_link(), {
        method: "POST",
        body: JSON.stringify({ 'method': 'torrent-remove', 'arguments': { 'ids': [id], 'delete-local-data': true } }),
                           headers: { 'Content-Type': 'application/json' }
    });
    return res.json()
}

TorrentWrapper.get = async (fields = ["id", "name", "status", "rateDownload", "rateUpload", "totalSize", "percentDone"]) => {
    const res = await fetch(TorrentWrapper.client_link(), {
        method: "POST",
        body: JSON.stringify({ 'method': 'torrent-get', 'arguments': { "fields": fields } }),
                            headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
}

TorrentWrapper.exampleProccessFile = () => {
    const reader = new FileReader();
    reader.onload = async () => {
        const b64 = btoa(String.fromCharCode(...new Uint8Array(reader.result)));
        await torrent_add(b64);
    };
    reader.readAsArrayBuffer(file);
}
