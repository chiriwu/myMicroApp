import React, { useEffect, useState } from 'react';
import { Input, Button, notification } from 'antd';
import Player from 'xgplayer';
import MusicPreset, { Lyric, Analyze } from 'xgplayer-music';
import 'xgplayer/dist/index.min.css';
import './style/Music.css';
let player = null;
export default function () {
  const [musicUrl, setMusicUrl] = useState(null);
  const ChangeMusic = function () {
    if (player) {
      player.src = musicUrl;
      player.url = musicUrl;
    }
  };
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.error({
      message: `链接错误`,
      description: '请填入新的链接，或者点击下方蓝色文字获取最新测试音频链接',
      duration: null,
      placement,
    });
  };

  useEffect(() => {
    let lyricTxts = `[00:00.00] 脆弱一分钟\n[00:00.00] 作曲 : 林家谦\n[00:00.00] 作词 : 徐世珍/吴辉福\n[00:00.000]编曲：林家谦\n[00:00.000]时钟不要走\n[00:04.220]让我脆弱一分钟\n[00:07.440]要多久才能习惯被放手\n[00:15.800]马克杯空了 暖暖的温热\n[00:22.660]却还在我手中停留\n[00:27.960]\n[00:29.790]勇气不要走\n[00:32.200]给我理由再冲动\n[00:35.690]去相信爱情 就算还在痛\n[00:43.960]如果我不说不会有人懂\n[00:50.720]失去你我有多寂寞\n[00:55.610]还是愿意\n[00:57.580]付出一切仅仅为了一个好梦\n[01:03.980]梦里有人真心爱我 陪我快乐也陪我沉默\n[01:11.260]没有无缘无故的痛承受越多越成熟\n[01:18.630]能让你拥抱更好的我\n[01:25.030] 谁也不要走\n[01:28.270]应该是一种奢求\n[01:31.900]可是我只想 握紧你的手\n[01:39.780]我宁愿等候 也不愿错过\n[01:46.630]你对我微笑的时候\n[01:56.780]\n[02:18.910]还是愿意\n[02:21.320]用尽全力仅仅为了一个以后\n[02:27.870]哪怕生命并不温柔哪怕被幸福一再反驳\n[02:34.870]也要相信伤痕累累 其实只是在琢磨\n[02:42.070]能让你为之一亮 的我\n[02:53.910]\n[02:56.350]制作人：林宥嘉\n[02:57.750]制作助理：张婕汝\n[02:59.010]录音师：陈文骏、叶育轩\n[03:00.410]录音室：白金录音室\n[03:01.740]混音师：SimonLi @ nOiz\n[03:03.000]OP: Terence Lam Production & Co. (Warner/Chappell Music, HK Ltd.)\n[03:04.050]SP: Warner/Chappell Music Taiwan Ltd.\n[03:04.910]OP：Universal Ms Publ Ltd Taiwan\n`;
    // http://music.163.com/song/media/outer/url?id=447925558.mp3
    player = new Player({
      id: 'player',
      url: 'http://m10.music.126.net/20240120225401/dcbdb1b03ab81885a1bc948f89d68da8/ymusic/5353/0f0f/0358/d99739615f8e5153d77042092f07fd77.mp3',
      volume: 0.8,
      width: '100%',
      height: 50,
      mediaType: 'audio',
      presets: ['default', MusicPreset],
      ignores: ['playbackrate'],
      controls: {
        initShow: true,
        mode: 'flex',
      },
      marginControls: true,
      videoConfig: {
        crossOrigin: 'anonymous',
      },
    });
    player.crossOrigin = 'anonymous';

    // 初始化频谱
    new Analyze(player, document.querySelector('canvas'), {
      bgColor: 'rgba(0,0,0,0.7)',
      stroke: 3,
    });

    // 初始化歌词模块
    var lyric = new Lyric([lyricTxts], document.querySelector('#gc'), {});
    lyric.bind(player);
    let nullText = 0;
    player.on('lyricUpdate', (res) => {
      if (res.lyric === '\n') {
        nullText++;
      }
    });

    player.on('playing', function () {
      lyric.show();
      player.mode = 2;
    });
    player.on('error', function () {
      openNotification('top');
      // message.error('');
    });

    return () => {};
  }, []);

  return (
    <>
      {/* //没看懂这个作用是啥，不使用后者，调用不会生效 */}
      {contextHolder}
      <div id="allLive" className="liveContainer">
        <div id="album"></div>
        <div id="info">
          歌曲名称
          <div>歌手：xxx</div>
          <div>专辑：xxxxx </div>
        </div>
        <div className="select"></div>
        <div id="canvas">
          <canvas style={{ width: '100%', height: '200px' }}></canvas>
        </div>
        <div id="mask">
          <div id="gc"></div>
        </div>
        <div id="player"></div>
      </div>
      <div className="opearte">
        <Input
          onChange={(e) => {
            setMusicUrl(e.target.value);
          }}
          style={{ width: '400px', marginLeft: '10px', marginRight: '5px' }}
          addonBefore="替换音频地址:"
          value={musicUrl}
        />
        <Button onClick={ChangeMusic} type="primary">
          替换
        </Button>
      </div>
      <div className="tipInfo">
        <a href="http://music.163.com/song/media/outer/url?id=447925558.mp3" rel="noopener noreferrer" target="_blank">
          获取视频测试地址，获取后输入上方框
        </a>
      </div>
    </>
  );
}
