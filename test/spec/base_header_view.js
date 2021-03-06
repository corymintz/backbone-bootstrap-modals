/* global describe, it */

(function () {
  'use strict';

  describe('BaseHeaderView', function() {
    describe('with no options', function() {
      var view;

      beforeEach(function() {
        view = new BackboneBootstrapModals.BaseHeaderView();
      });

      it('should render default markup', function() {
        view.render();
        assert.equal(view.el.outerHTML,
                     '<div class="modal-header">'+
                       '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\u00D7</button>'+
                       '<h4 id="myModalLabel" class="modal-title"></h4>'+
                     '</div>');
      });
    });

    describe('with basic options', function() {
      var view;

      beforeEach(function() {
        view = new BackboneBootstrapModals.BaseHeaderView({
          label: 'Hello',
          labelId: 'hello-title',
          labelTagName: 'h3',
          showClose: false
        });
      });

      it('should render default markup', function() {
        view.render();
        assert.equal(view.el.outerHTML,
                     '<div class="modal-header">'+
                       '<h3 id="hello-title" class="modal-title">Hello</h3>'+
                     '</div>');
      });
    });
  });
})();
