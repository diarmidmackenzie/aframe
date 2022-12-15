/* global THREE, Bench */

const initializeBenchmark = function () {
  var position = new THREE.Vector3(1, 1, 1);
  var scale = new THREE.Vector3(2, 1, 0.5);
  var quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 8);
  var createLocallyOffsetChild = function (type) {
    const child = document.createElement('a-box');
    child.object3D.visible = false;
    child.object3D.position.copy(position);
    child.object3D.scale.copy(scale);
    child.object3D.quaternion.copy(quaternion);
    return child;
  };

  var generateSceneGraph = function (id, depth, breadth, initObject, type) {
    const sceneEl = document.querySelector('a-scene');
    const root = document.createElement('a-entity');
    root.id = id;
    sceneEl.appendChild(root);

    generateSceneTier(root, depth, breadth, initObject, type);

    return root;
  };

  var generateSceneTier = function (root, depth, breadth, initObject, type) {
    if (depth > 0) {
      for (var i = 0; i < breadth; i++) {
        var child = initObject(type);
        root.appendChild(child);
        generateSceneTier(child, depth - 1, breadth, initObject, type);
      }
    }
  };

  var nodeCount = function (root) {
    let count = 0;
    root.object3D.traverse(() => { count++; });
    return count;
  };

  var rootA = generateSceneGraph('graph-A', 100, 1, createLocallyOffsetChild, 'Object3D');
  var rootB = generateSceneGraph('graph-B', 3, 10, createLocallyOffsetChild, 'Object3D');
  var rootC = generateSceneGraph('graph-C', 9, 3, createLocallyOffsetChild, 'Object3D');

  var s = Bench.newSuite('Update world transforms');

  setTimeout(() => {
    s.add('Update graph depth=100, breadth=1 (' + nodeCount(rootA) + ' Object3Ds)', function () {
      rootA.object3D.updateMatrixWorld(true);
    });
    s.add('Update graph depth=3, breadth=10 (' + nodeCount(rootB) + ' Object3Ds)', function () {
      rootB.object3D.updateMatrixWorld(true);
    });
    s.add('Update graph depth=9, breadth=3 (' + nodeCount(rootC) + ' Object3Ds)', function () {
      rootC.object3D.updateMatrixWorld(true);
    });

    document.querySelector('a-scene').emit('benchmarks-ready');
  }, 1000);
};

window.AFRAME = Bench.AFRAME;

window.AFRAME.registerComponent('benchmark', {
  init () {
    initializeBenchmark();
  }
});
