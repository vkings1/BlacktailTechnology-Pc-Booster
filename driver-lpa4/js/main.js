$( function() {
    $( '.click' ).bind( 'click', function( e ) {
        e.stopPropagation();
        e.preventDefault();
        var parent = $( this ).parent();
        if( parent.hasClass( 'pending' ) ) {
            return false;
        }
        parent.addClass( 'pending' );
        parent.find( '.a_content' ).slideToggle( 'slow', function(){
            parent.toggleClass( 'collapsed', 'slow' ).removeClass( 'pending' );
        } );
    } );
} );