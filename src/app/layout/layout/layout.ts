import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,SidebarComponent,Navbar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
