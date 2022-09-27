export interface OverlayProps extends DisableOverlayProp {
  content: (disableOverlay: () => void) => JSX.Element;
}

export enum overlayType {
  DEFAULT = "default",
  CUSTOMIZE = "customize",
  QR_CODE = "qrcode",
}

export interface DisableOverlayProp {
  disableOverlay: () => void;
}
