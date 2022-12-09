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
      videoId: 'QYX1zchuSow',
      title: 'Meu primeiro acesso',
    },
    {
      run: false,
      videoId: 'pa-EoBKAcNU',
      title: 'Cadastrando locais de saída',
    },
    {
      run: false,
      videoId: 'TC8i90t0JKg',
      title: 'Cadastrando eventos',
    },
    {
      run: false,
      videoId: 'QYX1zchuSow',
      title: 'Cadastrando passageiros',
    },
    {
      run: false,
      videoId: 'QYX1zchuSow',
      title: 'Cadastrando passagens',
    },
    {
      run: false,
      videoId: 'QYX1zchuSow',
      title: 'Transferência de dados',
    },
  ];

  primeiroAcesso = 'QYX1zchuSow';
  primeiroAcessoRun = false;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  getUrlVideo(videoId: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' +
        videoId +
        '?autoplay=1&loop=1&autopause=0&muted=1'
    );
  }
  runVideo(currentVideo: any) {
    this.videos.forEach((video) => {
      video.run = false;
    });
    currentVideo.run = true;
  }
}
