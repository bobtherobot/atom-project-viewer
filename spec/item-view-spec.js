'use strict';

const _view = require('../src/item-view');
const _model = require('../src/model');
const _utils = require('../src/utils');

describe ('item-view', function() {

  const sandBoxView = document.createElement('div');

  beforeEach (function () {
    document.body.appendChild(sandBoxView);
  });

  afterEach (function () {
    document.body.removeChild(sandBoxView);
  });

  it ('if no valid model is passed it will throw errors', function() {
    const view = _view.createView();

    const fnInitialize = function _fnInitialize () {
      return view.initialize;
    }
    const fnRender = function _fnRender () {
      return view.render;
    }

    expect(view).toBeUndefined();
    expect(fnInitialize).toThrow();
    expect(fnRender).toThrow();
  });

  it ('should return an HTMLElement', function() {
    const itemModel = _model.createItem();
    const itemView = _view.createView(itemModel);

    expect(itemView).toBeInstanceOf(HTMLElement);
  });

  it ('should fetch the model associated with the view', function () {
    const itemModel = _model.createItem();
    const itemView = _view.createView(itemModel);
    const fetchedModel = _utils.getModel(itemView);

    expect(itemModel).toBe(fetchedModel);
  });

  it ('should fetch the view associated with the model', function () {
    const itemModel = _model.createItem();
    const itemView = _view.createView(itemModel);

    itemView.initialize();
    sandBoxView.appendChild(itemView);

    const fetchedView = _utils.getView(itemModel);

    expect(itemView).toBe(fetchedView);
  });

  it ('should set properly the name', function() {
    const itemModel = _model.createItem();
    const itemView = _view.createView(itemModel);

    itemView.initialize();
    itemView.render();

    let name = itemView.textContent;

    expect(name).toEqual('unnamed');
    expect(itemView.childNodes.length).toBe(1);

    itemModel.name = 'project #1';
    itemView.render();
    name = itemView.textContent;

    expect(name).toEqual('project #1');
    expect(itemView.childNodes.length).toBe(1);
    expect(itemView.childNodes[0].nodeName).toBe('#text');

    itemModel.icon = 'icon-mark-github';
    itemView.render();
    name = itemView.querySelector('span').textContent;

    expect(name).toEqual('project #1');
    expect(itemView.childNodes.length).toBe(1);
    expect(itemView.childNodes[0].nodeName).toBe('SPAN');

    itemModel.icon = undefined;
    itemView.render();
    name = itemView.textContent;

    expect(name).toEqual('project #1');
    expect(itemView.childNodes.length).toBe(1);
    expect(itemView.childNodes[0].nodeName).toBe('#text');

    itemModel.name = undefined;
    itemView.render();
    name = itemView.textContent;
    expect(name).toEqual('unnamed');
  });

  xit ('should set properly the icon', function() {});

  xit ('should set properly the color', function() {});
});
