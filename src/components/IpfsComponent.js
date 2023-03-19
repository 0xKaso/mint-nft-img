import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-core'

function IpfsComponent() {
  const [image, setImage] = useState(null);
  const [cid, setCid] = useState(null);
  const [imageData, setImageData] = useState(null);

  const handleImageUpload = async (event) => {
    const ipfs = await create({repo: 'ok' + Math.random()});
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const buffer = await Buffer.from(reader.result);
      const result = await ipfs.add(buffer);
      console.log('upload res', result);
      setCid(result.cid.toString());
      setImage(result.path);
    };
  };

  const onDownload = async () => {
    const ipfs = await create({repo: 'ok' + Math.random()});
    console.log('cid-', cid)
    const stream = await ipfs.cat(cid);
    // console.log('stream', stream);
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    console.log('buffer', buffer);
    const blob = new Blob([buffer]);
    console.log('blob', blob)
    const url = URL.createObjectURL(blob);
    console.log('url', url)
    setImageData(url);

  }

  // const download = async () => {
	// 	const node = await create({ repo: "ipfs" + Math.random() });
	// 	const results = await node.cat(path);
	// 	let stream = "";
	// 	for await (const val of results) {
	// 		stream += val.toString();
	// 	}
	// 	const arr = new Uint8Array(stream.split(","));
	// 	//这里文件格式要根据返回的Uint8Array前两位数去判断
	// 	const blob = new Blob([arr], { type: "image/jpeg" });

	// 	const url = URL.createObjectURL(blob);
	// 	const downloadLink = document.createElement("a");
	// 	downloadLink.setAttribute("href", url);
	// 	downloadLink.setAttribute("download", "测试");
	// 	downloadLink.style.display = "none";
	// 	document.body.appendChild(downloadLink);
	// 	downloadLink.click();
	// 	document.body.removeChild(downloadLink);
	// 	URL.revokeObjectURL(url);
	// };

  return (
    <div>
      <label htmlFor="file-upload">Upload Image: </label>
      <input id="file-upload" type="file" onChange={handleImageUpload} />
      {image && (
        <div>
          {/* <p>上传成功，CID：{image}</p> */}
          <p className='text-green-600'>上传成功，点击<a>https://ipfs.io/ipfs/{image}</a>可查看</p>
          
          <img src={`https://ipfs.io/ipfs/${image}`} alt="上传的图片" width={128} height={128}/>
        </div>
      )}
      {/* <label>NFT Name: </label>
      <input className='resize rounded-md ' /> */}
      {/* <a download="img" href={`https://ipfs.io/ipfs/${image}`}>download</a> */}
      {/* <div onClick={onDownload}>download</div>
      {imageData && <img src={imageData} alt="下载的图片" />} */}
    </div>
  );
}

export default IpfsComponent;
