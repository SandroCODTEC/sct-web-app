import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  videos = [
    {
      run: false,
      videoId: 'Xr6reOHBNRs',
      title: 'Meu primeiro acesso',
    },
    {
      run: false,
      videoId: 'L9uI1_FgH9Q',
      title: 'Cadastrando locais de saída',
    },
    {
      run: false,
      videoId: 'A71Eu2Lh83E',
      title: 'Cadastrando eventos',
    },
    {
      run: false,
      videoId: '0T26Hr0BOy0',
      title: 'Cadastrando passageiros',
    },
    {
      run: false,
      videoId: '_u4c-ieiZrc',
      title: 'Cadastrando passagens',
    },
    {
      run: false,
      videoId: 'qeaSxAFK0X0',
      title: 'Transferência de dados',
    },
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  getUrlVideo(videoId: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' +
        videoId +
        '?autoplay=1&loop=1&autopause=0&muted=1'
    );
  }

  showPopupVideo = false;
  video = {
    run: false,
    videoId: '',
    title: '',
  };
  runVideo(currentVideo: any) {
    this.videos.forEach((video) => {
      video.run = false;
    });
    currentVideo.run = true;
    this.showPopupVideo = true;

    this.video = currentVideo;
  }
}
