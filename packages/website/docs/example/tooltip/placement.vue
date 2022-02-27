<template>
  <fe-grid-group :gap="1.5" justify="center" align-items="center">
    <fe-grid :xs="8" justify="flex-end">
      <fe-tooltip placement="topStart" content="Top Left content message" type="dark"> TopStart </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="8" justify="center">
      <fe-tooltip placement="top" content="Top Left content message" type="dark"> Top </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="8">
      <fe-tooltip placement="topEnd" content="Top Right content message" type="dark"> TopEnd </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="6" justify="flex-end">
      <fe-tooltip placement="leftStart" content="Left Top content message" type="dark"> leftStart </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="12" />
    <fe-grid :xs="6">
      <fe-tooltip placement="rightStart" content="Right Top content message" type="dark"> RightStart </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="6" justify="flex-end">
      <fe-tooltip placement="left" content="Left Center content message" type="dark"> Left </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="12" />
    <fe-grid :xs="6">
      <fe-tooltip placement="right" content="Right Center content message" type="dark"> Right </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="6" justify="flex-end">
      <fe-tooltip placement="leftEnd" content="Left End content message" type="dark"> LeftEnd </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="12" />
    <fe-grid :xs="6">
      <fe-tooltip placement="rightEnd" content="Right End content message" type="dark"> RightEnd </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="8" justify="flex-end">
      <fe-tooltip placement="bottomStart" content="Bootom Left content message" type="dark"> BottomStart </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="8" justify="center">
      <fe-tooltip placement="bottom" content="Bottom Center content message" type="dark"> Bottom </fe-tooltip>
    </fe-grid>
    <fe-grid :xs="8">
      <fe-tooltip placement="bottomEnd" content="Bottom Right content message" type="dark"> BottomEnd </fe-tooltip>
    </fe-grid>
  </fe-grid-group>
</template>

<script>
export default {
  name: 'ExTooltipPlacement'
}
</script>
