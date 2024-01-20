import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber } from 'antd';
import FlvPlugin from 'xgplayer-flv';
import Player from 'xgplayer';
import HlsPlugin from 'xgplayer-hls';
import 'xgplayer/dist/index.min.css';
import style from './Live.module.css';

const defaultUrl = 'http://220.161.87.62:8800/hls/0/index.m3u8';
export default function () {
  useEffect(() => {
    createPlayer('player', defaultUrl);
    return () => {};
  }, []);
  const createPlayer = function (id, url) {
    //   if (FlvPlugin.isSupported()) {
    //     // 第一步，检测当前环境是否支持
    //     const player = new Player({
    //       id: 'player',
    //       url: 'test.flv', // flv 流地址
    //       isLive: true,
    //       plugins: [FlvPlugin], // 第二步
    //     });
    //  }
    if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) {
      // 原生支持 hls 播放
      new Player({
        el: document.querySelector('#' + id),
        url,
        pip: true,
        width: '50%',
        height: '100%',
      });
    } else if (HlsPlugin.isSupported()) {
      // 第一步，检测当前环境是否支持
      new Player({
        el: document.querySelector('#' + id),
        isLive: true,
        url, // hls 流地址
        pip: true,
        plugins: [HlsPlugin], // 第二步
        width: '50%',
        height: '100%',
      });
    }
  };
  const addOneLive = function (url) {
    const allLive = document.querySelector('#allLive');
    const newLive = document.createElement('div');
    const randomId = 'player' + Math.random().toFixed(5).toString().slice(2);
    newLive.setAttribute('id', randomId);
    allLive.insertBefore(newLive, allLive.lastChild);
    createPlayer(randomId, url);
    // 设置最大可设置第几个删除直播间
    const length = Array.from(document.querySelectorAll('#allLive')).length;
    setMaxLiveNum(length - 2);
  };
  const deleteOneLive = function () {
    const el = document.querySelector(`#allLive:nth-child(${liveOrder})`);
    el.remove();
  };
  const [liveUrl, setLiveUrl] = useState(defaultUrl);
  const [liveOrder, setLiveOrder] = useState(0);
  const [maxLiveNum, setMaxLiveNum] = useState(1);

  return (
    <div id="allLive" className={style.liveContainer}>
      <div id="player"></div>
      <div>
        <div>
          <Button
            onClick={() => {
              addOneLive(liveUrl);
            }}
            type="primary"
          >
            添加一个直播间
          </Button>
          <Input
            onChange={(e) => {
              setLiveUrl(e.target.value);
            }}
            style={{ width: '400px', marginLeft: '10px' }}
            addonBefore="推流m3u8地址:"
            value={liveUrl}
          />
        </div>
        <div>
          <Button onClick={deleteOneLive} type="primary">
            删除一个直播间
          </Button>
          <InputNumber
            onChange={(v) => {
              setLiveOrder(v);
            }}
            max={maxLiveNum}
            min={1}
            style={{ width: '200px', marginLeft: '10px' }}
            addonBefore="第"
            addonAfter="个"
            value={liveOrder}
            defaultValue="0"
          />
        </div>
      </div>
    </div>
  );
}
