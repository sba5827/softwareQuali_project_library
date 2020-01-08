import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from 'app/shared/shared.module';
import { LibUserComponent } from './lib-user.component';
import { LibUserDetailComponent } from './lib-user-detail.component';
import { LibUserUpdateComponent } from './lib-user-update.component';
import { LibUserDeleteDialogComponent } from './lib-user-delete-dialog.component';
import { libUserRoute } from './lib-user.route';

@NgModule({
  imports: [LibrarySharedModule, RouterModule.forChild(libUserRoute)],
  declarations: [LibUserComponent, LibUserDetailComponent, LibUserUpdateComponent, LibUserDeleteDialogComponent],
  entryComponents: [LibUserDeleteDialogComponent]
})
export class LibraryLibUserModule {}
