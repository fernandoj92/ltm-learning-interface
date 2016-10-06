export interface IContextMenuLinkConfig {
  title: string; //previously as html: (item:any) => string
  click: (item: any, $event?: MouseEvent) => void;
  enabled?: boolean; //previously as enabled?: (item: any) => boolean
}