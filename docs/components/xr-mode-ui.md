---
title: xr-mode-ui
type: components
layout: docs
parent_section: components
source_code: src/components/scene/xr-mode-ui.js
---

The xr-mode-ui component allows disabling of UI such as an Enter VR button, compatibility
modal, and orientation modal for mobile. The xr-mode-ui component applies only
to the [`<a-scene>` element][scene]. If we wish to simply toggle the UI, use CSS instead.

## Example

```html
<a-scene xr-mode-ui="enabled: false"></a-scene>
```

## Properties

| Property      | Description                                                         | Default Value |
|-----------------------|---------------------------------------------------------------------|---------------|
| cardboardModeEnabled  | Enables the now deprecated cardboard mode.                          | false         |
| enabled               | Whether or not to display UI related to entering VR.                | true          |
| enterVRButton         | Selector to a custom VR button. On click, the button will enter VR. | ''            |
| enterVREnabled        | If the VR button is displayed when applicable                       | false         |
| enterARButton         | Selector to a custom AR button. On click, the button will enter AR. | ''            |
| enterAREnabled        | If the AR button is displayed when applicable                       | false         |
| enterXRButton         | Selector to a custom AR button. On click, the button will enter AR. | ''            |
| enterXREnabled        | If the AR button is displayed when applicable                       | true          |
| XRMode                | Mode that the site enters when clicking the XR button (ar or vr).   | vr            |

### Specifying a Custom Enter VR Button

```html
<a-scene
  xr-mode-ui="enterVRButton: #myEnterVRButton; enterARButton: #myEnterARButton">
  <!-- Style the button with images or whatever. -->
  <a id="myEnterVRButton" href="#"></a>
  <a id="myEnterARButton" href="#"></a>
</a-scene>
```

[scene]: ../core/scene.md
