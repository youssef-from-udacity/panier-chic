/* Do not edit modules/_sprite directly as it is generated automatically by Gulp.
Instead edit gulp/templates/sprite */

{{#shapes}}
  {{#first}}
    .icon {
      background-image: url('../../assets/images/sprites/{{{sprite}}}');
    }
    .no-svg{
      overflow: hidden;
    }
    .no-svg .icon {
      background-image: url('../../assets/images/sprites/{{#replaceSvgWithPng}}{{{sprite}}}{{/replaceSvgWithPng}}');
    }
    {{/first}}
    
    .icon--{{base}} {
      width: {{width.outer}}px;
      height: {{height.outer}}px;
      background-position: {{position.relative.xy}};
      background-size: calc({{spriteWidth}}/{{width.outer}}*100%);
  }
{{/shapes}}


