import $ from 'jquery'
import Collapse from './collapse'


$('#navbarSupportedContent').on('show.bs.collapse', function () {
    $('.navbar-toggler-menu').addClass('navbar-toggler-menu--open')
  })

$('#navbarSupportedContent').on('hide.bs.collapse', function () {
    
    $('.navbar-toggler-menu').removeClass('navbar-toggler-menu--open')
  })