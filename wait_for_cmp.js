( function() {
    var insertAdsByGoogleJs = function() {
        var element = document.createElement('script');
        var firstScript = document.getElementsByTagName('script')[0];
        var url = "https://www.googletagservices.com/tag/js/gpt.js";
        element.async = true;
        element.type = 'text/javascript';
        element.src = url;
        firstScript.parentNode.insertBefore(element, firstScript);

    };


var cnt = 0;
var consentSetInterval = setInterval(function(){

    cnt += 1;
    if( cnt === 600 ) clearInterval(consentSetInterval);

    if( typeof window.__tcfapi !== 'undefined' ) { // Check if window.__tcfapi has been set
        clearInterval( consentSetInterval );
        window.__tcfapi( 'addEventListener', 2, function( tcData,listenerSuccess ) {
            if ( listenerSuccess ){

                if( tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete' ){
                    if ( !tcData.gdprApplies ){// GDPR DOES NOT APPLY
                        insertAdsByGoogleJs();
                    }else{// GDPR DOES APPLY

                        var hasDeviceStorageAndAccessConsent = tcData.purpose.consents[1] || false;// Purpose 1 refers to the storage and/or access of information on a device.// Google Requires Consent for Purpose 1
                        var hasGoogleAdvertisingProductsConsent = false;
                        if (hasDeviceStorageAndAccessConsent){
                            hasGoogleAdvertisingProductsConsent = tcData.vendor.consents[755] || false;// Check if the user gave Google Advertising Products consent (iab vendor 755)
                            if ( hasGoogleAdvertisingProductsConsent ) insertAdsByGoogleJs();
                        }}
                    }
                }
            }
        )}
    ;
    cnt++;
}, 100)
})();