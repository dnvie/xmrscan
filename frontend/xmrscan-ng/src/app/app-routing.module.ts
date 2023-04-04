import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockComponent } from './component/block/block.component';
import { BlocksComponent } from './component/blocks/blocks.component';
import { TransactionComponent } from './component/transaction/transaction.component';

const routes: Routes = [
  {path: '', component: BlocksComponent},
  {path: 'block/:id', component: BlockComponent},
  {path: 'transaction/:id', component: TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
