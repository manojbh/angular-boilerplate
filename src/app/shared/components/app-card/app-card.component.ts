
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  template: `
  <div class=" col-sm-12 col-md-12 col-lg-12">
  <div class="card item_card "style = "width: 225px">
            <a>
            <div class="thumbnail">
              <img alt="thumbnail" src="{{item.image != '' ? item.image : 'assets/icons/icon_short.png'}}"  >

            </div>
            <div class="item_info">
              <div class="moving p-2">
                  <span class="font-weight-bold item_title">{{item.title}}</span>

                  <p class="text-info">
                    {{item.content}}
                  </p>
              </div>
            </div>
          </a>
          </div>
</div>
  `,
  styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent {
  @Input('item') item;
  constructor(
    private router: Router,
  ) {
  }
}
