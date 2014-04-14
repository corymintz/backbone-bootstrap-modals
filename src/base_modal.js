// BaseModal
// ---------------------------------
//
// The base class all other modals extend.

BackboneBootstrapModals.BaseModal = Backbone.View.extend({
  className: 'modal',
  attributes: {
    'tabindex': '-1',
    'role': 'dialog',
    'aria-labelledby': 'myModalLabel'
  },
  
  // Register Handlers for Bootstrap Modal Events: http://getbootstrap.com/javascript/#modals
  events: {
    'show.bs.modal': 'onShowBsModal',
    'shown.bs.modal': 'onShownBsModal',
    'hide.bs.modal': 'onHideBsModal',
    'hidden.bs.modal': 'onHiddenBsModal'
  },

  // The default views if not overridden or specified in options
  headerView: BackboneBootstrapModals.BaseHeaderView,
  bodyView: BackboneBootstrapModals.BaseBodyView,
  footerView: BackboneBootstrapModals.BaseFooterView,

  // The modal options that will be used if none are passed as options to the constructor
  defaultModalOptions: {
    backdrop: true,
    keyboard: true
  },

  initialize: function (opts) {
    var options = opts || {};
    this.shown = false;
    this.modalOptions = _.extend({}, this.defaultModalOptions, options.modalOptions);
    this.initializeSubviews(options);
  },

  // Initialize views for header, body, and footer sections.
  // All subviews should respect Bootstrap markup guidelines.
  initializeSubviews: function(options) {
    // Initialize headerView
    this.headerViewInstance = this.buildSubview(
      'headerView',
      'headerViewOptions',
      options);
    // Initialize bodyView
    this.bodyViewInstance = this.buildSubview(
      'bodyView',
      'bodyViewOptions',
      options);
    // Initialize footerView
    this.footerViewInstance = this.buildSubview(
      'footerView',
      'footerViewOptions',
      options);
  },

  // Default to using viewKey and viewOptionsKey already present on the view.
  // Otherwise, check to see if values were passed through options.
  buildSubview: function(viewKey, viewOptionsKey, options) {
    // Override any defined viewOptions with the one in options if present
    if (options[viewOptionsKey]) {
      this[viewOptionsKey] = options[viewOptionsKey];
    }
    // Override any defined view with the one in options if present
    if (options[viewKey]) {
      this[viewKey] = options[viewKey];
    }
    // Validate the view is present
    if (!this[viewKey]) {
      throw new Error(viewKey+" must be specified");
    }
    // Call the specified view constructor with the specified options
    return new this[viewKey](this[viewOptionsKey]);
  },

  render: function() {
    this.$el.html([
      '<div class="modal-dialog">',
      '<div class="modal-content">',
      '</div>',
      '</div>'
    ].join(''));

    var $modalContent = this.$el.find('.modal-content');

    if (this.headerView) {
      $modalContent.append(this.headerViewInstance.render().$el);
    }

    if (this.bodyView) {
      $modalContent.append(this.bodyViewInstance.render().$el);
    }

    if (this.footerView) {
      $modalContent.append(this.footerViewInstance.render().$el);
    }

    if (!this.shown && this.modalOptions.show !== false) {
        this.$el.modal(this.modalOptions);
    }

    return this;
  },

  remove: function () {
    this.removeSubviews();
    return Backbone.View.prototype.remove.apply(this, arguments);
  },

  removeSubviews: function() {
    if (this.headerView) { this.removeSubview(this.headerViewInstance); }
    if (this.bodyView) { this.removeSubview(this.bodyViewInstance);  }
    if (this.footerView) { this.removeSubview(this.footerViewInstance);  }
  },

  // Attempt to use Marionette's close first, falling back to Backbone's remove
  removeSubview: function(viewInstance) {
    if (Backbone.Marionette && viewInstance.close) {
        viewInstance.close.apply(viewInstance);
    } else if (viewInstance.remove) {
        viewInstance.remove.apply(viewInstance);
    }
  },

  show: function() {
    this.$el.modal('show');
  },

  hide: function() {
    this.$el.modal('hide');
  },

  // This event fires immediately when the show instance method is called.
  onShowBsModal: function(e) {
  },

  // This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). 
  onShownBsModal: function(e) {
      this.shown = true;
  },

  // This event is fired immediately when the hide instance method has been called.
  onHideBsModal: function(e) {
  },

  // This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
  onHiddenBsModal: function(e) {
    this.shown = false;
    this.remove();
  },

});
