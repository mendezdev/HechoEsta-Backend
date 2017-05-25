// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MarketComponent } from './components/market/market.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FolderComponent } from './components/folder/folder.component';
import { FoldersComponent } from './components/folders/folders.component';
import { CartComponent } from './components/cart/cart.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { SalesComponent } from './components/sales/sales.component';
import { SaleComponent } from './components/sale/sale.component';


// Services
import { MarketService } from './services/market.service';
import { SaleService } from './services/sale.service';
import { AuthService} from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { FolderService } from './services/folder.service';


// Routes
const appRoutes: Routes = [  
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'market', component: MarketComponent, canActivate: [AuthGuard]},
  {path: 'folder', component: FolderComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'sale/:id', component: SaleComponent},
  {path: '**', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MarketComponent,
    LoginComponent,
    HomeComponent,
    FoldersComponent,
    CartComponent,
    UsuarioComponent,
    SalesComponent,
    SaleComponent,
    FolderComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [
    MarketService,
    SaleService,
    AuthService,
    FolderService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
