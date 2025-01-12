import React, { useEffect, useState } from 'react';
import { Button, Tag } from 'antd';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import style from './Video.module.css';

const testUrlList = [
  'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4',
  'https://stream7.iqilu.com/10339/article/202002/18/2fca1c77730e54c7b500573c2437003f.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218025702PSiVKDB5ap.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4',
  'https://stream7.iqilu.com/10339/article/202002/18/02319a81c80afed90d9a2b9dc47f85b9.mp4',
  'http://stream4.iqilu.com/ksd/video/2020/02/17/c5e02420426d58521a8783e754e9f4e6.mp4',
  'http://stream4.iqilu.com/ksd/video/2020/02/17/87d03387a05a0e8aa87370fb4c903133.mp4',
  'https://stream7.iqilu.com/10339/article/202002/17/c292033ef110de9f42d7d539fe0423cf.mp4',
  'http://stream4.iqilu.com/ksd/video/2020/02/17/97e3c56e283a10546f22204963086f65.mp4',
  'https://stream7.iqilu.com/10339/article/202002/17/778c5884fa97f460dac8d90493c451de.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/17/20200217021133Eggh6zdlAO.mp4',
  'https://stream7.iqilu.com/10339/article/202002/17/4417a27b1a656f4779eaa005ecd1a1a0.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/17/20200217104524H4D6lmByOe.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/17/20200217101826WjyFCbUXQ2.mp4',
  'http://stream.iqilu.com/vod_bag_2016//2020/02/16/903BE158056C44fcA9524B118A5BF230/903BE158056C44fcA9524B118A5BF230_H264_mp4_500K.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/16/20200216050645YIMfjPq5Nw.mp4',
  'https://stream7.iqilu.com/10339/article/202002/16/3be2e4ef4aa21bfe7493064a7415c34d.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
  'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4',
];
let videoTagList = ['新闻', '国产', '测试'];

let player = null;
export default function () {
  const [curIndex, setCurIndex] = useState(0);
  useEffect(() => {
    createPlayer('player');
    return () => {};
  }, []);

  const createPlayer = function (id) {
    const containerWidth = document.getElementById('allLive').offsetWidth;
    player = new Player({
      el: document.querySelector('#' + id),
      url: testUrlList[curIndex],
      pip: true,
      // width: containerWidth - 360 + 'px',
      width: '100%',
    });
  };
  useEffect(() => {
    player.src = testUrlList[curIndex];
  }, [curIndex]);

  const toggleVideoUrl = function (index) {
    if (player) {
      setCurIndex(index);
    }
  };

  return (
    <div id="allLive" className={style.liveContainer}>
      <div id="player" className={style.player}></div>
      <div className={style.playSide}>
        <div className={style.playInfo}>
          <h1 style={{ fontSize: '20px' }}>飞驰人生2</h1>
          <div>
            {videoTagList.map((item, index) => {
              return (
                <Tag color="magenta" key={index}>
                  {item}
                </Tag>
              );
            })}
          </div>
        </div>
        <div className={style.playList}>
          {testUrlList.map((item, index) => {
            return (
              <Button
                style={{ backgroundColor: index === curIndex ? '#4096ff' : '' }}
                onClick={() => {
                  toggleVideoUrl(index);
                }}
                key={index}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
