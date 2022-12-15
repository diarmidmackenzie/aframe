/* global Benchmark, _ */

/* Benchmarks code derived from THREE.js Benchmarks under MIT License.

The MIT License

Copyright © 2010-2019 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var BenchClass = function () {
  this.suites = [];
  this.AFRAME = window.AFRAME;
  window.AFRAME = undefined;
  Benchmark.options.maxTime = 1.0;
  return this;
};

BenchClass.prototype.isAFRAMELoaded = function () {
  return _.isObject(this.AFRAME);
};

BenchClass.prototype.newSuite = function (name) {
  var s = new Benchmark.Suite(name);
  this.suites.push(s);
  return s;
};

BenchClass.prototype.display = function () {
  for (var x of this.suites) {
    var s = new SuiteUI(x);
    s.render();
  }
};

BenchClass.prototype.warning = function (message) {
  console.error(message);
};

var SuiteUI = function (suite) {
  this.suite = suite;
  this.isRunning = false;
  return this;
};

SuiteUI.prototype.render = function () {
  var n = document.importNode(this.suiteTemplate, true);
  this.elem = n.querySelector('article');
  this.results = n.querySelector('.results');
  this.title = n.querySelector('h2');
  this.runButton = n.querySelector('h3');

  this.title.innerText = this.suite.name;
  this.runButton.onclick = this.run.bind(this);

  this.section.appendChild(n);
};

SuiteUI.prototype.run = function () {
  this.runButton.click = _.noop;
  this.runButton.innerText = 'Running...';
  this.suite.on('complete', this.complete.bind(this));
  this.suite.run({
    async: true
  });
};

SuiteUI.prototype.complete = function () {
  this.runButton.style.display = 'none';
  this.results.style.display = 'block';
  var f = _.orderBy(this.suite, [ 'hz' ], [ 'desc' ]);
  for (var i = 0; i < f.length; i++) {
    var x = f[ i ];
    var n = document.importNode(this.suiteTestTemplate, true);
    n.querySelector('.name').innerText = x.name;
    n.querySelector('.ops').innerText = x.hz.toFixed();
    n.querySelector('.desv').innerText = x.stats.rme.toFixed(2);
    this.results.appendChild(n);
  }
};

var Bench = new BenchClass();
window.addEventListener('benchmarks-ready', function () {
  SuiteUI.prototype.suiteTemplate = document.querySelector('#suite').content;
  SuiteUI.prototype.suiteTestTemplate = document.querySelector('#suite-test').content;
  SuiteUI.prototype.section = document.querySelector('section');

  Bench.display();
});
