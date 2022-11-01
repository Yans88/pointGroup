'use strict';

const sendEmailVerification = (req, token) => {
  const email_header = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_header.png`;

  const email_banner = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_body_banner.jpg`;

  const one = `${req.protocol}://${req.get('host')}/public/assets/one.png`;

  const two = `${req.protocol}://${req.get('host')}/public/assets/two.png`;

  const three = `${req.protocol}://${req.get('host')}/public/assets/three.png`;

  const visit_our_website = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/visit_our_website.png`;

  const send_us_email = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/send_us_email.png`;

  const email_banner_2 = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_body_banner_2.jpg`;

  const email_banner_logos = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_body_logos.jpg`;

  // const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta property="og:title" content="Welcome to Club OpenRoad, claim your bonus points now">
    <meta property="fb:page_id" content="43929265776">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="referrer" content="origin">        
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
        <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to Club OpenRoad, claim your bonus points now</title>
        
    <style type="text/css">
		  p{
			  margin:10px 0;
			  padding:0;
		  }
		  table{
			  border-collapse:collapse;
		  }
		  h1,h2,h3,h4,h5,h6{
			  display:block;
			  margin:0;
			  padding:0;
		  }
		  img,a img{
			  border:0;
			  height:auto;
			  outline:none;
			  text-decoration:none;
		  }
		  body,#bodyTable,#bodyCell{
			  height:100%;
			  margin:0;
			  padding:0;
			  width:100%;
		  }
		  .mcnPreviewText{
			  display:none !important;
		  }
		  #outlook a{
			  padding:0;
		  }
		  img{
			  -ms-interpolation-mode:bicubic;
		  }
		  table{
			  mso-table-lspace:0pt;
			  mso-table-rspace:0pt;
		  }
		  .ReadMsgBody{
			  width:100%;
		  }
		  .ExternalClass{
			  width:100%;
		  }
		  p,a,li,td,blockquote{
			  mso-line-height-rule:exactly;
		  }
		  a[href^=tel],a[href^=sms]{
			  color:inherit;
			  cursor:default;
			  text-decoration:none;
		  }
		  p,a,li,td,body,table,blockquote{
			  -ms-text-size-adjust:100%;
			  -webkit-text-size-adjust:100%;
		  }
		  .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			  line-height:100%;
		  }
		  a[x-apple-data-detectors]{
			  color:inherit !important;
			  text-decoration:none !important;
			  font-size:inherit !important;
			  font-family:inherit !important;
			  font-weight:inherit !important;
			  line-height:inherit !important;
		  }
		  #bodyCell{
			  padding:10px;
		  }
		  .templateContainer{
			  max-width:600px !important;
		  }
		  a.mcnButton{
			  display:block;
		  }
		  .mcnImage,.mcnRetinaImage{
			  vertical-align:bottom;
		  }
		  .mcnTextContent{
			  word-break:break-word;
		  }
		  .mcnTextContent img{
			  height:auto !important;
		  }
		  .mcnDividerBlock{
			  table-layout:fixed !important;
		  }
		  body,#bodyTable{
			  background-color:#eeeeee;
		  }
		  #bodyCell{
			  border-top:0;
		  }
		  .templateContainer{
			  border:0;
		  }
		  h1{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:28px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h2{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:22px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h3{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:20px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h4{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:18px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  #templatePreheader{
			  background-color:#transparent;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:9px;
			  padding-bottom:9px;
		  }
		  #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			  color:#656565;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:12px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
			  color:#656565;
			  font-weight:normal;
			  text-decoration:underline;
		  }
		  #templateHeader{
			  background-color:#ffffff;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:0px;
			  padding-bottom:0;
		  }
		  #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:16px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
			  color:#143784;
			  font-weight:normal;
			  text-decoration:underline;
		  }
		  #templateBody{
			  background-color:#ffffff;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:2px none #EAEAEA;
			  padding-top:0;
			  padding-bottom:0px;
		  }
		  #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:16px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
			  color:#003399;
			  font-weight:bold;
			  text-decoration:underline;
		  }
		  #templateFooter{
			  background-color:#444444;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:32px;
			  padding-bottom:32px;
		  }
		  #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			  color:#c4c4c4;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:12px;
			  line-height:150%;
			  text-align:center;
		  }
		  #templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
			  color:#eeeeee;
			  font-weight:normal;
			  text-decoration:underline;
		  }
	    @media only screen and (min-width:768px){
		    .templateContainer{
			    width:600px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    body,table,td,p,a,li,blockquote{
			    -webkit-text-size-adjust:none !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    body{
			    width:100% !important;
			    min-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnRetinaImage{
			    max-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImage{
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			    max-width:100% !important;
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnBoxedTextContentContainer{
			    min-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupContent{
			    padding:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			    padding-top:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			    padding-top:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardBottomImageContent{
			    padding-bottom:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupBlockInner{
			    padding-top:0 !important;
			    padding-bottom:0 !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupBlockOuter{
			    padding-top:9px !important;
			    padding-bottom:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnTextContent,.mcnBoxedTextContentColumn{
			    padding-right:18px !important;
			    padding-left:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			    padding-right:18px !important;
			    padding-bottom:0 !important;
			    padding-left:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcpreview-image-uploader{
			    display:none !important;
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h1{
			    font-size:22px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h2{
			    font-size:20px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h3{
			    font-size:18px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h4{
			    font-size:16px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templatePreheader{
			    display:block !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			    font-size:16px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			    font-size:12px !important;
			    line-height:150% !important;
		    }
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;background-color: #eeeeee;">
        <tbody>
          <tr>
            <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 10px;width: 100%;border-top: 0;">
              <!-- BEGIN TEMPLATE // -->
              <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                            <tr>
                            <td align="center" valign="top" width="600" style="width:600px;">
                            <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;max-width: 600px !important;">
                <tbody>
      <tr>
        <td valign="top" id="templatePreheader" style="background:#transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 9px;padding-bottom: 9px;">
        </td>
      </tr>
      <tr>
        <td valign="top" id="templateHeader" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0px;padding-bottom: 0;">

          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a href=${process.env.CLIENT_URL}/sign-in title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_header} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">

                  <!--[if mso]>
				                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                        <tr>
				                        <![endif]-->
			    
				          <!--[if mso]>
				                        <td valign="top" width="600" style="width:600px;">
				                        <![endif]-->

                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;font-size: 11px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;text-align: left;">
                          Membership information to go here
                        </td>
                      </tr>
                    </tbody>
                  </table>

				          <!--[if mso]>
			                                </td>
			                                <![endif]-->
                
		              <!--[if mso]>
		                                  </tr>
				                              </table>
				                              <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                
                          <a href=${process.env.CLIENT_URL}/sign-in title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_banner} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                                
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td valign="top" id="templateBody" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 2px none #EAEAEA;padding-top: 0;padding-bottom: 0px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	  <!--[if mso]>
				                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                          <tr>
				                          <![endif]-->
			    
				          <!--[if mso]>
				                          <td valign="top" width="600" style="width:600px;">
				                          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;font-size: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;text-align: left;">
                          <div style="text-align: left;margin:25px 0 0;">
                            <h1 style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 28px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">Welcome to Club OpenRoad</h1>

                            <p style="text-align: center;font-size: 18px;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;">An exclusive lifestyle and rewards program brought to you by OpenRoad Auto Group</p>
                          </div>

                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                        </td>
				                        <![endif]-->
                
				          <!--[if mso]>
				                        </tr>
				                        </table>
				                        <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnButtonBlockOuter">
              <tr>
                <td style="padding-top: 0;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top" align="center" class="mcnButtonBlockInner">
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-top-left-radius: 6px;border-top-right-radius: 6px;border-bottom-right-radius: 6px;border-bottom-left-radius: 6px;background-color: #44C8F5;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial;font-size: 16px;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a class="mcnButton " title="Verify Account ➔" href=${process.env.CLIENT_URL}/activation?token=${token} target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;">Verify Account ➔</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;">
            <tbody class="mcnDividerBlockOuter">
              <tr>
                <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top-width: 2px;border-top-style: solid;border-top-color: #EAEAEA;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <span></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--            
                                    <td class="mcnDividerBlockInner" style="padding: 18px;">
                                    <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                  -->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	  <!--[if mso]>
				                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                          <tr>
				                          <![endif]-->
			    
				          <!--[if mso]>
				                          <td valign="top" width="600" style="width:600px;">
				                          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">
                        
                          Hi Member,
                          <br>
                          <br>
                          Being an OpenRoad customer just got even more rewarding. Through the years, our members have saved over 3.5 million dollars on vehicle purchases and have enjoyed being a part of
                          <a href=${process.env.CLIENT_URL}/events target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">exclusive&nbsp;events</a> and promotions through our free loyalty program.
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                          </td>
				                          <![endif]-->
                
				          <!--[if mso]>
				                          </tr>
				                          </table>
				                          <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	  <!--[if mso]>
				                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                        <tr>
				                        <![endif]-->
			    
				          <!--[if mso]>
				                        <td valign="top" width="600" style="width:600px;">
				                        <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">
                        
                          <table style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
	                          <tbody>
		                          <tr>
			                          <td style="width: 60px;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img alt="1" src=${one} style="width: 100%;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"></td>

			                          <td style="padding-left: 20px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
			                            <h3 style="display: block;margin: 0;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;text-align: left;">Activate</h3>

			                            <p style="margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">You are already enrolled in Club OpenRoad, but there’s one more step. All that’s left to do is activate your account — it only takes one click and we’ll give you 1,000 bonus points for doing&nbsp;it!
                                    <br>
			                              <br>
			                              <strong>
                                      <a href=${process.env.CLIENT_URL}/sign-in style="display: inlin-block;padding: 12px 14px;background-color: #44c8f5;color: #fff;text-decoration: none;font-size: 14px !important;border-radius: 6px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-weight: bold;" target="_blank">Sign in to Claim Points ➔
                                      </a>
                                    </strong>
                                  </p>
			                          </td>
		                          </tr>
	                          </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                          </td>
				                          <![endif]-->
                
				          <!--[if mso]>
				                          </tr>
				                          </table>
				                          <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	  <!--[if mso]>
				                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                      <tr>
				                      <![endif]-->
			    
				          <!--[if mso]>
				                      <td valign="top" width="600" style="width:600px;">
				                      <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">
                        
                          <table style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
	                          <tbody>
		                          <tr>
			                          <td style="width: 60px;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img alt="2" src=${two} style="width: 100%;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
                                </td>

			                          <td style="padding-left: 20px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
			                            <h3 style="display: block;margin: 0;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;text-align: left;">Earn &amp; Experience</h3>

			                            <p style="margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">You will start earning 15% back in points on what you spend when you service your car at any OpenRoad dealership. Keep track of your points through your membership portal at
                                    <a href=${process.env.CLIENT_URL} target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">clubopenroad.ca</a>.
                                    You’ll also start receiving invitations to member-exclusive events and bonus point opportunities.
                                  </p>
			                          </td>
		                          </tr>
	                          </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                          </td>
				                          <![endif]-->
                
				          <!--[if mso]>
				                          </tr>
				                          </table>
				                          <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	  <!--[if mso]>
				                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                      <tr>
				                      <![endif]-->
			    
				          <!--[if mso]>
				                      <td valign="top" width="600" style="width:600px;">
				                      <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">
                          
                          <table style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
	                          <tbody>
		                          <tr>
			                          <td style="width: 60px;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img alt="3" src=${three} style="width: 100%;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
                                </td>
			                          <td style="padding-left: 20px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
			                            <h3 style="display: block;margin: 0;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;text-align: left;">Redeem</h3>

			                            <p style="margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">Use your points or transfer them to immediate family members to save up to $1,500 off your next new or used car purchase at any OpenRoad dealership, or use them towards your everyday vehicle service for up to 15% of your repair order to a maximum $500.
                                    <sup>[1]</sup>
                                  </p>
			                          </td>
		                          </tr>
	                          </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                            </td>
				                            <![endif]-->
                
				          <!--[if mso]>
				                            </tr>
				                            </table>
				                            <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a href=${process.env.CLIENT_URL}/sign-in title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="Activate your Club OpenRoad membership now" src=${email_banner_2} width="564" style="max-width: 1140px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div class="mcnTextContent" style="background-color: #f4f4f4;padding: 25px 15px;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">
                    <h2 style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">Want to learn more?</h2>
                    <div style="max-width:250px;margin: 20px auto 0;">
                      <div>
                        <a href=${process.env.CLIENT_URL} target="_blank" style="display: inline-block;margin-bottom: 0px;border-radius: 6px;overflow: hidden;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">
                          <img src=${visit_our_website} style="display: block;width: 100%;max-width: 250px;margin: 0;line-height: 0;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
                        </a>
                      </div>
                      <div>
                        <a href="mailto:club@openroadautogroup.com" style="display: inline-block;background: #aaa;border-radius: 6px;overflow: hidden;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">
                          <img src=${send_us_email} style="display: block;width: 100%;max-width: 250px;margin: 0;line-height: 0;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a href=${process.env.CLIENT_URL}/contact-us title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_banner_logos} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td valign="top" id="templateFooter" style="background:#444444 none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #444444;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 32px;padding-bottom: 32px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <!--[if mso]>
				                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                        <tr>
				                        <![endif]-->
			    
				          <!--[if mso]>
				                        <td valign="top" width="600" style="width:600px;">
				                        <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;text-align: center;">
                          <p style="margin: 0 auto 25px;font-size: 14px;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;text-align: center;">
                            <strong>© 2022 Club OpenRoad</strong>
                            <br>
                            13100 Smallwood Place (Richmond Auto Mall)
                            <br>
                            Richmond BC, V6V 1W8 |
                            <a href=${process.env.CLIENT_URL} target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">clubopenroad.ca</a>
                          </p>

                          <p style="margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;text-align: center;">
                            <a href=${process.env.CLIENT_URL}/term-and-conditions target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Terms &amp; Conditions</a>
                            •
                            <a href=${process.env.CLIENT_URL}/faq target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">FAQs</a>
                            •
                            <a href="http://e.openroadautonews.com/Eloop.Form.html?f=p&amp;c=1319&amp;i=1&amp;a={enc_subscriber_id}&amp;t={track_id}" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Unsubscribe</a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                              </td>
				                              <![endif]-->
                
				          <!--[if mso]>
				                              </tr>
				                              </table>
				                              <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;">
            <tbody class="mcnDividerBlockOuter">
              <tr>
                <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top-width: 1px;border-top-style: solid;border-top-color: #888888;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <span></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--            
                                      <td class="mcnDividerBlockInner" style="padding: 18px;">
                                      <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                  -->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <!--[if mso]>
				                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                          <tr>
				                          <![endif]-->
			    
				          <!--[if mso]>
				                          <td valign="top" width="600" style="width:600px;">
				                          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;text-align: left;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;">
                          <div style="text-align: left;">By activating your membership, you consent to receiving electronic communications from Club OpenRoad and OpenRoad Auto Group. You can unsubscribe from our electronic communications at any time by logging into your online Member Account and updating your Member Profile, or clicking the unsubscribe link in your Member email newsletter. Please note that Club OpenRoad point balances will expire after 12 months for guests that do not activate their Club OpenRoad membership.
                            <br>
                            <br>
                            [1] Use your points to redeem up to 15% of your customer-paid service repair order. Minimum service repair order of $150 required. Maximum dollar value of 15% discount cannot exceed $500 per invoice. Warranty repairs excluded. Tire purchases excluded from redemptions. See full Club OpenRoad
                            <a href=${process.env.CLIENT_URL}/term-and-conditions target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Terms and Conditions</a>.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                            </td>
				                            <![endif]-->
                
				          <!--[if mso]>
				                            </tr>
				                            </table>
				                            <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
              
              </table>
              <!--[if (gte mso 9)|(IE)]>
                                </td>
                                </tr>
                                </table>
                                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </body>
</html>`;
};

const sendEmailMemberActivation = (req, member) => {
  const email_header = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_header.png`;

  const email_banner = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_membership_activation_header.jpg`;

  const visit_our_website = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/visit_our_website.png`;

  const send_us_email = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/send_us_email.png`;

  const email_banner_logos = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_body_logos.jpg`;

  let person;
  if (member) {
    const { first_name } = member;
    person = first_name !== null ? first_name : 'Member';
  } else {
    person = 'Member';
  }

  // const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta property="og:title" content="Welcome to Club OpenRoad, claim your bonus points now">
    <meta property="fb:page_id" content="43929265776">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="referrer" content="origin">        
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
        <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to Club OpenRoad, claim your bonus points now</title>
        
    <style type="text/css">
		  p{
			  margin:10px 0;
			  padding:0;
		  }
		  table{
			  border-collapse:collapse;
		  }
		  h1,h2,h3,h4,h5,h6{
			  display:block;
			  margin:0;
			  padding:0;
		  }
		  img,a img{
			  border:0;
			  height:auto;
			  outline:none;
			  text-decoration:none;
		  }
		  body,#bodyTable,#bodyCell{
			  height:100%;
			  margin:0;
			  padding:0;
			  width:100%;
		  }
		  .mcnPreviewText{
			  display:none !important;
		  }
		  #outlook a{
			  padding:0;
		  }
		  img{
			  -ms-interpolation-mode:bicubic;
		  }
		  table{
			  mso-table-lspace:0pt;
			  mso-table-rspace:0pt;
		  }
		  .ReadMsgBody{
			  width:100%;
		  }
		  .ExternalClass{
			  width:100%;
		  }
		  p,a,li,td,blockquote{
			  mso-line-height-rule:exactly;
		  }
		  a[href^=tel],a[href^=sms]{
			  color:inherit;
			  cursor:default;
			  text-decoration:none;
		  }
		  p,a,li,td,body,table,blockquote{
			  -ms-text-size-adjust:100%;
			  -webkit-text-size-adjust:100%;
		  }
		  .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			  line-height:100%;
		  }
		  a[x-apple-data-detectors]{
			  color:inherit !important;
			  text-decoration:none !important;
			  font-size:inherit !important;
			  font-family:inherit !important;
			  font-weight:inherit !important;
			  line-height:inherit !important;
		  }
		  #bodyCell{
			  padding:10px;
		  }
		  .templateContainer{
			  max-width:600px !important;
		  }
		  a.mcnButton{
			  display:block;
		  }
		  .mcnImage,.mcnRetinaImage{
			  vertical-align:bottom;
		  }
		  .mcnTextContent{
			  word-break:break-word;
		  }
		  .mcnTextContent img{
			  height:auto !important;
		  }
		  .mcnDividerBlock{
			  table-layout:fixed !important;
		  }
		  body,#bodyTable{
			  background-color:#eeeeee;
		  }
		  #bodyCell{
			  border-top:0;
		  }
		  .templateContainer{
			  border:0;
		  }
		  h1{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:28px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h2{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:22px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h3{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:20px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h4{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:18px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  #templatePreheader{
			  background-color:#transparent;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:9px;
			  padding-bottom:9px;
		  }
		  #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			  color:#656565;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:12px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
			  color:#656565;
			  font-weight:normal;
			  text-decoration:underline;
		  }
		  #templateHeader{
			  background-color:#ffffff;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:0px;
			  padding-bottom:0;
		  }
		  #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:16px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
			  color:#143784;
			  font-weight:normal;
			  text-decoration:underline;
		  }
		  #templateBody{
			  background-color:#ffffff;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:2px none #EAEAEA;
			  padding-top:0;
			  padding-bottom:0px;
		  }
		  #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:16px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
			  color:#003399;
			  font-weight:bold;
			  text-decoration:underline;
		  }
		  #templateFooter{
			  background-color:#444444;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:32px;
			  padding-bottom:32px;
		  }
		  #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			  color:#c4c4c4;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:12px;
			  line-height:150%;
			  text-align:center;
		  }
		  #templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
			  color:#eeeeee;
			  font-weight:normal;
			  text-decoration:underline;
		  }
	    @media only screen and (min-width:768px){
		    .templateContainer{
			    width:600px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    body,table,td,p,a,li,blockquote{
			    -webkit-text-size-adjust:none !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    body{
			    width:100% !important;
			    min-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnRetinaImage{
			    max-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImage{
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			    max-width:100% !important;
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnBoxedTextContentContainer{
			    min-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupContent{
			    padding:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			    padding-top:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			    padding-top:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardBottomImageContent{
			    padding-bottom:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupBlockInner{
			    padding-top:0 !important;
			    padding-bottom:0 !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupBlockOuter{
			    padding-top:9px !important;
			    padding-bottom:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnTextContent,.mcnBoxedTextContentColumn{
			    padding-right:18px !important;
			    padding-left:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			    padding-right:18px !important;
			    padding-bottom:0 !important;
			    padding-left:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcpreview-image-uploader{
			    display:none !important;
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h1{
			    font-size:22px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h2{
			    font-size:20px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h3{
			    font-size:18px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h4{
			    font-size:16px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templatePreheader{
			    display:block !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			    font-size:16px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			    font-size:12px !important;
			    line-height:150% !important;
		    }
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;background-color: #eeeeee;">
        <tbody>
          <tr>
            <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 10px;width: 100%;border-top: 0;">
              <!-- BEGIN TEMPLATE // -->
              <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                            <tr>
                            <td align="center" valign="top" width="600" style="width:600px;">
                            <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;max-width: 600px !important;">
                <tbody>
      <tr>
        <td valign="top" id="templatePreheader" style="background:#transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 9px;padding-bottom: 9px;">
        </td>
      </tr>
      <tr>
        <td valign="top" id="templateHeader" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0px;padding-bottom: 0;">

          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a href=${process.env.CLIENT_URL}/sign-in title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_header} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">

                  <!--[if mso]>
				                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                        <tr>
				                        <![endif]-->
			    
				          <!--[if mso]>
				                        <td valign="top" width="600" style="width:600px;">
				                        <![endif]-->

                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;font-size: 11px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;text-align: left;">
                          Membership information to go here
                        </td>
                      </tr>
                    </tbody>
                  </table>

				          <!--[if mso]>
			                                </td>
			                                <![endif]-->
                
		              <!--[if mso]>
		                                  </tr>
				                              </table>
				                              <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                
                          <a href=${process.env.CLIENT_URL}/sign-in title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_banner} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                                
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td valign="top" id="templateBody" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 2px none #EAEAEA;padding-top: 0;padding-bottom: 0px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:20px"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	<!--[if mso]>
				                  <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                  <tr>
				                  <![endif]-->
			    
				        <!--[if mso]>
				        <td valign="top" width="600" style="width:600px;">
				        <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">
                          <h1 style="text-align: center;margin: 0 0 30px;display: block;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 28px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">Welcome to the Club
                          </h1>
                            Hello ${person},
                            <br>
                            <br>
                            You’re in! Thank you for activating your Club OpenRoad membership.
                            <br>
                            <br>
                            You are well on your way to enjoying exclusive member benefits, including earning 15% back in points every time you service your vehicle at any OpenRoad dealership. When the time comes, you can use your points to save up to $1,500 off your next vehicle purchase from any OpenRoad dealership. You can also redeem points on service repairs, up to 15% off your service bill any time you spend over $150 to a maximum of $500 in points redemption.<sup>[1]</sup>
                            <br>
                            <br>
                            As a member you will receive invitations to exclusive member events, like driving clinics and movie nights, plus you’ll be the first to hear about exciting OpenRoad promotions like contests and sales events. You’ll be kept up to speed with our member newsletters!
                            <br>
                            <br>
                            Your points will be automatically credited to your account after each service visit. Check your points balance and latest Club OpenRoad news through your online member portal at&nbsp;<a href="https://clubopenroad.ca/" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">ClubOpenRoad.ca</a>.
                            <br>
                            <br>
                            We’re happy to have you join us!
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                      </td>
				                      <![endif]-->
                
				          <!--[if mso]>
				                      </tr>
				                      </table>
				                      <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	  <!--[if mso]>
				                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                          <tr>
				                          <![endif]-->
			    
				          <!--[if mso]>
				                          <td valign="top" width="600" style="width:600px;">
				                          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div class="mcnTextContent" style="background-color: #f4f4f4;padding: 25px 15px;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">
                    <h2 style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">Want to learn more?</h2>
                    <div style="max-width:250px;margin: 20px auto 0;">
                      <div>
                        <a href=${process.env.CLIENT_URL} target="_blank" style="display: inline-block;margin-bottom: 0px;border-radius: 6px;overflow: hidden;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">
                          <img src=${visit_our_website} style="display: block;width: 100%;max-width: 250px;margin: 0;line-height: 0;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
                        </a>
                      </div>
                      <div>
                        <a href="mailto:club@openroadautogroup.com" style="display: inline-block;background: #aaa;border-radius: 6px;overflow: hidden;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">
                          <img src=${send_us_email} style="display: block;width: 100%;max-width: 250px;margin: 0;line-height: 0;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a href=${process.env.CLIENT_URL}/contact-us title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_banner_logos} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td valign="top" id="templateFooter" style="background:#444444 none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #444444;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 32px;padding-bottom: 32px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <!--[if mso]>
				                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                        <tr>
				                        <![endif]-->
			    
				          <!--[if mso]>
				                        <td valign="top" width="600" style="width:600px;">
				                        <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;text-align: center;">
                          <p style="margin: 0 auto 25px;font-size: 14px;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;text-align: center;">
                            <strong>© 2022 Club OpenRoad</strong>
                            <br>
                            13100 Smallwood Place (Richmond Auto Mall)
                            <br>
                            Richmond BC, V6V 1W8 |
                            <a href=${process.env.CLIENT_URL} target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">clubopenroad.ca</a>
                          </p>

                          <p style="margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;text-align: center;">
                            <a href=${process.env.CLIENT_URL}/term-and-conditions target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Terms &amp; Conditions</a>
                            •
                            <a href=${process.env.CLIENT_URL}/faq target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">FAQs</a>
                            •
                            <a href="http://e.openroadautonews.com/Eloop.Form.html?f=p&amp;c=1319&amp;i=1&amp;a={enc_subscriber_id}&amp;t={track_id}" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Unsubscribe</a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                              </td>
				                              <![endif]-->
                
				          <!--[if mso]>
				                              </tr>
				                              </table>
				                              <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;">
            <tbody class="mcnDividerBlockOuter">
              <tr>
                <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top-width: 1px;border-top-style: solid;border-top-color: #888888;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <span></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--            
                                      <td class="mcnDividerBlockInner" style="padding: 18px;">
                                      <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                  -->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <!--[if mso]>
				                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                          <tr>
				                          <![endif]-->
			    
				          <!--[if mso]>
				                          <td valign="top" width="600" style="width:600px;">
				                          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;text-align: left;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;">
                          <div style="text-align: left;">By activating your membership, you consent to receiving electronic communications from Club OpenRoad and OpenRoad Auto Group. You can unsubscribe from our electronic communications at any time by logging into your online Member Account and updating your Member Profile, or clicking the unsubscribe link in your Member email newsletter. Please note that Club OpenRoad point balances will expire after 12 months for guests that do not activate their Club OpenRoad membership.
                            <br>
                            <br>
                            [1] Use your points to redeem up to 15% of your customer-paid service repair order. Minimum service repair order of $150 required. Maximum dollar value of 15% discount cannot exceed $500 per invoice. Warranty repairs excluded. Tire purchases excluded from redemptions. See full Club OpenRoad
                            <a href=${process.env.CLIENT_URL}/term-and-conditions target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Terms and Conditions</a>.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                            </td>
				                            <![endif]-->
                
				          <!--[if mso]>
				                            </tr>
				                            </table>
				                            <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
              
              </table>
              <!--[if (gte mso 9)|(IE)]>
                                </td>
                                </tr>
                                </table>
                                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </body>
</html>`;
};

const sendEmailForgotPassword = (req, token, member) => {
  const email_header = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_header.png`;

  const email_banner = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_body_banner.jpg`;

  const visit_our_website = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/visit_our_website.png`;

  const send_us_email = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/send_us_email.png`;

  const email_banner_logos = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/email_body_logos.jpg`;

  let person;
  if (member) {
    const { first_name } = member;
    person = first_name !== null ? first_name : 'Member';
  } else {
    person = 'Member';
  }

  // const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta property="og:title" content="Welcome to Club OpenRoad, claim your bonus points now">
    <meta property="fb:page_id" content="43929265776">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="referrer" content="origin">        
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
        <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to Club OpenRoad, claim your bonus points now</title>
        
    <style type="text/css">
		  p{
			  margin:10px 0;
			  padding:0;
		  }
		  table{
			  border-collapse:collapse;
		  }
		  h1,h2,h3,h4,h5,h6{
			  display:block;
			  margin:0;
			  padding:0;
		  }
		  img,a img{
			  border:0;
			  height:auto;
			  outline:none;
			  text-decoration:none;
		  }
		  body,#bodyTable,#bodyCell{
			  height:100%;
			  margin:0;
			  padding:0;
			  width:100%;
		  }
		  .mcnPreviewText{
			  display:none !important;
		  }
		  #outlook a{
			  padding:0;
		  }
		  img{
			  -ms-interpolation-mode:bicubic;
		  }
		  table{
			  mso-table-lspace:0pt;
			  mso-table-rspace:0pt;
		  }
		  .ReadMsgBody{
			  width:100%;
		  }
		  .ExternalClass{
			  width:100%;
		  }
		  p,a,li,td,blockquote{
			  mso-line-height-rule:exactly;
		  }
		  a[href^=tel],a[href^=sms]{
			  color:inherit;
			  cursor:default;
			  text-decoration:none;
		  }
		  p,a,li,td,body,table,blockquote{
			  -ms-text-size-adjust:100%;
			  -webkit-text-size-adjust:100%;
		  }
		  .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			  line-height:100%;
		  }
		  a[x-apple-data-detectors]{
			  color:inherit !important;
			  text-decoration:none !important;
			  font-size:inherit !important;
			  font-family:inherit !important;
			  font-weight:inherit !important;
			  line-height:inherit !important;
		  }
		  #bodyCell{
			  padding:10px;
		  }
		  .templateContainer{
			  max-width:600px !important;
		  }
		  a.mcnButton{
			  display:block;
		  }
		  .mcnImage,.mcnRetinaImage{
			  vertical-align:bottom;
		  }
		  .mcnTextContent{
			  word-break:break-word;
		  }
		  .mcnTextContent img{
			  height:auto !important;
		  }
		  .mcnDividerBlock{
			  table-layout:fixed !important;
		  }
		  body,#bodyTable{
			  background-color:#eeeeee;
		  }
		  #bodyCell{
			  border-top:0;
		  }
		  .templateContainer{
			  border:0;
		  }
		  h1{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:28px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h2{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:22px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h3{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:20px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  h4{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:18px;
			  font-style:normal;
			  font-weight:bold;
			  line-height:125%;
			  letter-spacing:normal;
			  text-align:left;
		  }
		  #templatePreheader{
			  background-color:#transparent;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:9px;
			  padding-bottom:9px;
		  }
		  #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			  color:#656565;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:12px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
			  color:#656565;
			  font-weight:normal;
			  text-decoration:underline;
		  }
		  #templateHeader{
			  background-color:#ffffff;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:0px;
			  padding-bottom:0;
		  }
		  #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:16px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
			  color:#143784;
			  font-weight:normal;
			  text-decoration:underline;
		  }
		  #templateBody{
			  background-color:#ffffff;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:2px none #EAEAEA;
			  padding-top:0;
			  padding-bottom:0px;
		  }
		  #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			  color:#202020;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:16px;
			  line-height:150%;
			  text-align:left;
		  }
		  #templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
			  color:#003399;
			  font-weight:bold;
			  text-decoration:underline;
		  }
		  #templateFooter{
			  background-color:#444444;
			  background-image:none;
			  background-repeat:no-repeat;
			  background-position:center;
			  background-size:cover;
			  border-top:0;
			  border-bottom:0;
			  padding-top:32px;
			  padding-bottom:32px;
		  }
		  #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			  color:#c4c4c4;
			  font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			  font-size:12px;
			  line-height:150%;
			  text-align:center;
		  }
		  #templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
			  color:#eeeeee;
			  font-weight:normal;
			  text-decoration:underline;
		  }
	    @media only screen and (min-width:768px){
		    .templateContainer{
			    width:600px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    body,table,td,p,a,li,blockquote{
			    -webkit-text-size-adjust:none !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    body{
			    width:100% !important;
			    min-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnRetinaImage{
			    max-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImage{
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			    max-width:100% !important;
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnBoxedTextContentContainer{
			    min-width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupContent{
			    padding:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			    padding-top:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			    padding-top:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardBottomImageContent{
			    padding-bottom:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupBlockInner{
			    padding-top:0 !important;
			    padding-bottom:0 !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageGroupBlockOuter{
			    padding-top:9px !important;
			    padding-bottom:9px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnTextContent,.mcnBoxedTextContentColumn{
			    padding-right:18px !important;
			    padding-left:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			    padding-right:18px !important;
			    padding-bottom:0 !important;
			    padding-left:18px !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcpreview-image-uploader{
			    display:none !important;
			    width:100% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h1{
			    font-size:22px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h2{
			    font-size:20px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h3{
			    font-size:18px !important;
			    line-height:125% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    h4{
			    font-size:16px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templatePreheader{
			    display:block !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			    font-size:16px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			    font-size:14px !important;
			    line-height:150% !important;
		    }
      }
      @media only screen and (max-width: 480px){
		    #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			    font-size:12px !important;
			    line-height:150% !important;
		    }
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;background-color: #eeeeee;">
        <tbody>
          <tr>
            <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 10px;width: 100%;border-top: 0;">
              <!-- BEGIN TEMPLATE // -->
              <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                            <tr>
                            <td align="center" valign="top" width="600" style="width:600px;">
                            <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;max-width: 600px !important;">
                <tbody>
      <tr>
        <td valign="top" id="templatePreheader" style="background:#transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 9px;padding-bottom: 9px;">
        </td>
      </tr>
      <tr>
        <td valign="top" id="templateHeader" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0px;padding-bottom: 0;">

          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a href=${process.env.CLIENT_URL}/sign-in title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_header} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">

                  <!--[if mso]>
				                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                        <tr>
				                        <![endif]-->
			    
				          <!--[if mso]>
				                        <td valign="top" width="600" style="width:600px;">
				                        <![endif]-->

                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;font-size: 11px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;text-align: left;">
                          Membership information to go here
                        </td>
                      </tr>
                    </tbody>
                  </table>

				          <!--[if mso]>
			                                </td>
			                                <![endif]-->
                
		              <!--[if mso]>
		                                  </tr>
				                              </table>
				                              <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                
                          <a href=${process.env.CLIENT_URL}/sign-in title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_banner} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                                
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td valign="top" id="templateBody" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 2px none #EAEAEA;padding-top: 0;padding-bottom: 0px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	  <!--[if mso]>
				                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                          <tr>
				                          <![endif]-->
			    
				          <!--[if mso]>
				                          <td valign="top" width="600" style="width:600px;">
				                          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;font-size: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;text-align: left;">
                          <div style="text-align: left;margin:25px 0 0;">
                            <h1 style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 28px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">Reset Your Password</h1>

                            <p style="text-align: center;font-size: 18px;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;">Hi ${person}, please click the button below to reset your password</p>
                          </div>

                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                        </td>
				                        <![endif]-->
                
				          <!--[if mso]>
				                        </tr>
				                        </table>
				                        <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnButtonBlockOuter">
              <tr>
                <td style="padding-top: 0;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top" align="center" class="mcnButtonBlockInner">
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-top-left-radius: 6px;border-top-right-radius: 6px;border-bottom-right-radius: 6px;border-bottom-left-radius: 6px;background-color: #44C8F5;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial;font-size: 16px;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a class="mcnButton " title="Set New Password ➔" href=${process.env.CLIENT_URL}/forgot-password?token=${token} target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;">Set New Password ➔</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              	  <!--[if mso]>
				                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                          <tr>
				                          <![endif]-->
			    
				          <!--[if mso]>
				                          <td valign="top" width="600" style="width:600px;">
				                          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div class="mcnTextContent" style="background-color: #f4f4f4;padding: 25px 15px;word-break: break-word;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 16px;line-height: 150%;text-align: left;">
                    <h2 style="text-align: center;display: block;margin: 0;padding: 0;color: #202020;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">Want to learn more?</h2>
                    <div style="max-width:250px;margin: 20px auto 0;">
                      <div>
                        <a href=${process.env.CLIENT_URL} target="_blank" style="display: inline-block;margin-bottom: 0px;border-radius: 6px;overflow: hidden;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">
                          <img src=${visit_our_website} style="display: block;width: 100%;max-width: 250px;margin: 0;line-height: 0;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
                        </a>
                      </div>
                      <div>
                        <a href="mailto:club@openroadautogroup.com" style="display: inline-block;background: #aaa;border-radius: 6px;overflow: hidden;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #003399;font-weight: bold;text-decoration: underline;">
                          <img src=${send_us_email} style="display: block;width: 100%;max-width: 250px;margin: 0;line-height: 0;border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <a href=${process.env.CLIENT_URL}/contact-us title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <img align="center" alt="" src=${email_banner_logos} width="600" style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnRetinaImage">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <div style="height:30px"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td valign="top" id="templateFooter" style="background:#444444 none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #444444;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 32px;padding-bottom: 32px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <!--[if mso]>
				                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                        <tr>
				                        <![endif]-->
			    
				          <!--[if mso]>
				                        <td valign="top" width="600" style="width:600px;">
				                        <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;text-align: center;">
                          <p style="margin: 0 auto 25px;font-size: 14px;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;line-height: 150%;text-align: center;">
                            <strong>© 2022 Club OpenRoad</strong>
                            <br>
                            13100 Smallwood Place (Richmond Auto Mall)
                            <br>
                            Richmond BC, V6V 1W8 |
                            <a href=${process.env.CLIENT_URL} target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">clubopenroad.ca</a>
                          </p>

                          <p style="margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;text-align: center;">
                            <a href=${process.env.CLIENT_URL}/term-and-conditions target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Terms &amp; Conditions</a>
                            •
                            <a href=${process.env.CLIENT_URL}/faq target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">FAQs</a>
                            •
                            <a href="http://e.openroadautonews.com/Eloop.Form.html?f=p&amp;c=1319&amp;i=1&amp;a={enc_subscriber_id}&amp;t={track_id}" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Unsubscribe</a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                              </td>
				                              <![endif]-->
                
				          <!--[if mso]>
				                              </tr>
				                              </table>
				                              <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;">
            <tbody class="mcnDividerBlockOuter">
              <tr>
                <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top-width: 1px;border-top-style: solid;border-top-color: #888888;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody>
                      <tr>
                        <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <span></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--            
                                      <td class="mcnDividerBlockInner" style="padding: 18px;">
                                      <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                  -->
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody class="mcnTextBlockOuter">
              <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <!--[if mso]>
				                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				                          <tr>
				                          <![endif]-->
			    
				          <!--[if mso]>
				                          <td valign="top" width="600" style="width:600px;">
				                          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
                      <tr>
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;text-align: left;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #c4c4c4;font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size: 12px;line-height: 150%;">
                          <div style="text-align: left;">By activating your membership, you consent to receiving electronic communications from Club OpenRoad and OpenRoad Auto Group. You can unsubscribe from our electronic communications at any time by logging into your online Member Account and updating your Member Profile, or clicking the unsubscribe link in your Member email newsletter. Please note that Club OpenRoad point balances will expire after 12 months for guests that do not activate their Club OpenRoad membership.
                            <br>
                            <br>
                            [1] Use your points to redeem up to 15% of your customer-paid service repair order. Minimum service repair order of $150 required. Maximum dollar value of 15% discount cannot exceed $500 per invoice. Warranty repairs excluded. Tire purchases excluded from redemptions. See full Club OpenRoad
                            <a href=${process.env.CLIENT_URL}/term-and-conditions target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #eeeeee;font-weight: normal;text-decoration: underline;">Terms and Conditions</a>.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
				          <!--[if mso]>
				                            </td>
				                            <![endif]-->
                
				          <!--[if mso]>
				                            </tr>
				                            </table>
				                            <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
              
              </table>
              <!--[if (gte mso 9)|(IE)]>
                                </td>
                                </tr>
                                </table>
                                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </body>
</html>`;
};

const sendAddPointNotification = (
  req,
  member_source,
  transaksi,
  dataContact
) => {
  const logoPath = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/orag_logo_1.png`;
  const { source_fullname } = member_source;
  const { point, member_id, transaction, description_transaksi } = transaksi;
  const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title>ORAG Loyalty Platform</title>

    <link
      href="http://fonts.cdnfonts.com/css/gotham-rounded"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
        font-style: normal;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }

      *[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }

      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }

      .primary {
        background: #17bebb;
      }
      .bg_white {
        background: #ffffff;
      }
      .bg_light {
        background: #f7fafa;
      }
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }
      .email-section {
        padding: 2.5em;
      }

      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
      .btn.btn-primary {
        border-radius: 5px;
        background: #17bebb;
        color: #ffffff;
      }
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }
      .btn-custom {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Gotham Rounded", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #17bebb;
      }

      table {
      }
      /*LOGO*/

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: #17bebb;
        font-size: 24px;
        font-weight: 700;
        font-family: "Gotham Rounded", sans-serif;
      }

      .text-author {
        border: 1px solid #e0e0e0;
        max-width: 80%;
        margin: 0 auto;
        padding: 2em;
      }

      .tbl {
        border: 1px solid #e0e0e0;
      }

      .text-author h3 {
        margin-bottom: 0;
      }
      ul.social {
        padding: 0;
      }
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <img
                      src=${logoPath}
                      alt="OpenRoad Auto Group"
                      style="
                        width: 100px;
                        max-width: 600px;
                        height: auto;
                        margin: auto;
                        display: block;
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end tr -->
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="90%"
                class="tbl"
              >
                <tr>
                  <td
                    bgcolor="#44C8F5"
                    style="
                      padding: 20px 30px 20px 30px;
                      color: #fff;
                      font-weight: 350;
                      font-size: 24px;
                      text-align: center;
                    "
                  >
                    Add Point Notification
                  </td>
                </tr>

                <tr>
                  <td
                    bgcolor="#ffffff"
                    style="
                      padding: 40px 30px 40px 30px;
                      color: #333333;
                      background-color: #ffffff;
                      font-weight: 325;
                      line-height: 150%;
                      font-size: 12px;
                    "
                  >
                    To ${source_fullname},<br /><br />

                    You have receive points with details below.<br /><br />

                    Time created: <br />
                    ${date} <br /><br />

                    Transaction: ${transaction}
                    <br /><br />

                    Description: ${description_transaksi} <br /><br />

                    Add amount: ${point} point(s) <br />

                    ___________________________________<br /><br />
                    
                    Need help? Contact us<br />
                     ${dataContact}<br />

                    ___________________________________<br /><br />
                    OpenRoad Auto Group - Loyalty Platform<br />
                    Copyright 2022 &copy; Club OpenRoad
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
	`;
};

const sendEmailTransferNotificationDestination = (
  req,
  member_source,
  member_destination,
  transaksi,
  dataContact
) => {
  const logoPath = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/orag_logo_1.png`;
  const { source_fullname, email_source, member_id } = member_source;
  const { point, description_transaksi } = transaksi;
  const { destination_fullname } = member_destination;
  const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"  
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title>ORAG Loyalty Platform</title>

    <link
      href="http://fonts.cdnfonts.com/css/gotham-rounded"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
        font-style: normal;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }

      *[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }

      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }

      .primary {
        background: #17bebb;
      }
      .bg_white {
        background: #ffffff;
      }
      .bg_light {
        background: #f7fafa;
      }
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }
      .email-section {
        padding: 2.5em;
      }

      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
      .btn.btn-primary {
        border-radius: 5px;
        background: #17bebb;
        color: #ffffff;
      }
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }
      .btn-custom {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Gotham Rounded", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #17bebb;
      }

      table {
      }
      /*LOGO*/

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: #17bebb;
        font-size: 24px;
        font-weight: 700;
        font-family: "Gotham Rounded", sans-serif;
      }

      .text-author {
        border: 1px solid #e0e0e0;
        max-width: 80%;
        margin: 0 auto;
        padding: 2em;
      }

      .tbl {
        border: 1px solid #e0e0e0;
      }

      .text-author h3 {
        margin-bottom: 0;
      }
      ul.social {
        padding: 0;
      }
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <img
                      src=${logoPath}
                      alt="OpenRoad Auto Group"
                      style="
                        width: 100px;
                        max-width: 600px;
                        height: auto;
                        margin: auto;
                        display: block;
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end tr -->
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="90%"
                class="tbl"
              >
                <tr>
                  <td
                    bgcolor="#44C8F5"
                    style="
                      padding: 20px 30px 20px 30px;
                      color: #fff;
                      font-weight: 350;
                      font-size: 24px;
                      text-align: center;
                    "
                  >
                    Transfer Notification
                  </td>
                </tr>

                <tr>
                  <td
                    bgcolor="#ffffff"
                    style="
                      padding: 40px 30px 40px 30px;
                      color: #333333;
                      background-color: #ffffff;
                      font-weight: 325;
                      line-height: 150%;
                      font-size: 12px;
                    "
                  >
                    To ${destination_fullname},<br /><br />

                    Your points has been added from a transfer with details such
                    as below.<br /><br />

                    Time created: <br />
                    ${date} <br /><br />     
					
					Source:<br />
                    Member ID: ${member_id} <br />
                    Email: ${email_source} <br />
                    Name: ${source_fullname} <br /><br />

                    Description: ${description_transaksi} <br /><br />

                    Transfer amount: ${point} point(s) <br />

                    ___________________________________<br /><br />
                    
                    Need help? Contact us<br />
                    ${dataContact}<br />

                    ___________________________________<br /><br />
                    OpenRoad Auto Group - Loyalty Platform<br />
                    Copyright 2022 &copy; Club OpenRoad
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
	`;
};

const sendEmailTransferNotificationSource = (
  req,
  member_source,
  member_destination,
  transaksi,
  dataContact
) => {
  const logoPath = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/orag_logo_1.png`;
  const { source_fullname } = member_source;
  const { point, description_transaksi } = transaksi;
  const { destination_fullname, email_destination, id_member_destination } =
    member_destination;
  const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title>ORAG Loyalty Platform</title>

    <link
      href="http://fonts.cdnfonts.com/css/gotham-rounded"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
        font-style: normal;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }

      *[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }

      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }

      .primary {
        background: #17bebb;
      }
      .bg_white {
        background: #ffffff;
      }
      .bg_light {
        background: #f7fafa;
      }
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }
      .email-section {
        padding: 2.5em;
      }

      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
      .btn.btn-primary {
        border-radius: 5px;
        background: #17bebb;
        color: #ffffff;
      }
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }
      .btn-custom {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Gotham Rounded", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #17bebb;
      }

      table {
      }
      /*LOGO*/

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: #17bebb;
        font-size: 24px;
        font-weight: 700;
        font-family: "Gotham Rounded", sans-serif;
      }

      .text-author {
        border: 1px solid #e0e0e0;
        max-width: 80%;
        margin: 0 auto;
        padding: 2em;
      }

      .tbl {
        border: 1px solid #e0e0e0;
      }

      .text-author h3 {
        margin-bottom: 0;
      }
      ul.social {
        padding: 0;
      }
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <img
                      src=${logoPath}
                      alt="OpenRoad Auto Group"
                      style="
                        width: 100px;
                        max-width: 600px;
                        height: auto;
                        margin: auto;
                        display: block;
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end tr -->
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="90%"
                class="tbl"
              >
                <tr>
                  <td
                    bgcolor="#44C8F5"
                    style="
                      padding: 20px 30px 20px 30px;
                      color: #fff;
                      font-weight: 350;
                      font-size: 24px;
                      text-align: center;
                    "
                  >
                    Transfer Notification
                  </td>
                </tr>

                <tr>
                  <td
                    bgcolor="#ffffff"
                    style="
                      padding: 40px 30px 40px 30px;
                      color: #333333;
                      background-color: #ffffff;
                      font-weight: 325;
                      line-height: 150%;
                      font-size: 12px;
                    "
                  >
                    To ${source_fullname},<br /><br />

                    Your points has been deducted from a transfer with details
                    such as below.<br /><br />

                    Time created: <br />
                    ${date} <br /><br />     
					
					Destination:<br />
                    Member ID: ${id_member_destination} <br />
                    Email: ${email_destination} <br />
                    Name: ${destination_fullname} <br /><br />

                    Description: ${description_transaksi} <br /><br />

                    Transfer amount: ${point} point(s) <br />

                    ___________________________________<br /><br />
                    
                    Need help? Contact us<br />
                     ${dataContact}<br />

                    ___________________________________<br /><br />
                    OpenRoad Auto Group - Loyalty Platform<br />
                    Copyright 2022 &copy; Club OpenRoad
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
	`;
};

const sendEmailAddPointVerification = (
  req,
  member_source,
  transaksi,
  url,
  adminName
) => {
  const logoPath = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/orag_logo_1.png`;
  const { email_source, source_fullname } = member_source;
  const { point, member_id, transaction, description_transaksi } = transaksi;
  const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title>ORAG Loyalty Platform</title>

    <link
      href="http://fonts.cdnfonts.com/css/gotham-rounded"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
        font-style: normal;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }

      *[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }

      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }

      .primary {
        background: #17bebb;
      }
      .bg_white {
        background: #ffffff;
      }
      .bg_light {
        background: #f7fafa;
      }
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }
      .email-section {
        padding: 2.5em;
      }

      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
      .btn.btn-primary {
        border-radius: 5px;
        background: #17bebb;
        color: #ffffff;
      }
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }
      .btn-custom {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Gotham Rounded", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #17bebb;
      }

      table {
      }
      /*LOGO*/

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: #17bebb;
        font-size: 24px;
        font-weight: 700;
        font-family: "Gotham Rounded", sans-serif;
      }

      .text-author {
        border: 1px solid #e0e0e0;
        max-width: 80%;
        margin: 0 auto;
        padding: 2em;
      }

      .tbl {
        border: 1px solid #e0e0e0;
      }

      .text-author h3 {
        margin-bottom: 0;
      }
      ul.social {
        padding: 0;
      }
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <img
                      src=${logoPath}
                      alt="OpenRoad Auto Group"
                      style="
                        width: 100px;
                        max-width: 600px;
                        height: auto;
                        margin: auto;
                        display: block;
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end tr -->
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="90%"
                class="tbl"
              >
                <tr>
                  <td
                    bgcolor="#44C8F5"
                    style="
                      padding: 20px 30px 20px 30px;
                      color: #fff;
                      font-weight: 350;
                      font-size: 24px;
                      text-align: center;
                    "
                  >
                    Add Verification
                  </td>
                </tr>

                <tr>
                   <td
                    bgcolor="#ffffff"
                    style="
                      padding: 40px 30px 40px 30px;
                      color: #333333;
                      background-color: #ffffff;
                      font-weight: 325;
                      line-height: 150%;
                      font-size: 12px;
                    "
                  >
                    To ${adminName},<br /><br />

                    You have added points with detail belows.<br /><br />

                    Time created: <br />
                    ${date} <br /><br />

                    Destination: <br />
                    Member ID: ${member_id} <br />
                    Email: ${email_source} <br />
                    Name: ${source_fullname} <br /><br />

                    Transaction: ${transaction}
                    <br /><br />

                    Description: ${description_transaksi} <br /><br />
                    Add amount: ${point} point(s) <br /><br />
                    Please, click the link below to verify this add point:
                    <br />
                    <a
                      href="${url}"
                      >${url}</a><br/><br />
                    ___________________________________<br />
                    OpenRoad Auto Group - Loyalty Platform<br />
                    Copyright 2022 &copy; Club OpenRoad
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
	`;
};

const sendEmailTransferVerification = (
  req,
  member_source,
  member_destination,
  url,
  adminName
) => {
  const logoPath = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/orag_logo_1.png`;
  const { source_fullname, email_source } = member_source;
  const {
    amount,
    member_id,
    transaction,
    description_transaksi,
    member_id_destination,
  } = req.body;
  const { destination_fullname, destination_email } = member_destination;
  const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title>ORAG Loyalty Platform</title>

    <link
      href="http://fonts.cdnfonts.com/css/gotham-rounded"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
        font-style: normal;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }

      *[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }

      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }

      .primary {
        background: #17bebb;
      }
      .bg_white {
        background: #ffffff;
      }
      .bg_light {
        background: #f7fafa;
      }
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }
      .email-section {
        padding: 2.5em;
      }

      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
      .btn.btn-primary {
        border-radius: 5px;
        background: #17bebb;
        color: #ffffff;
      }
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }
      .btn-custom {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Gotham Rounded", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #17bebb;
      }

      table {
      }
      /*LOGO*/

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: #17bebb;
        font-size: 24px;
        font-weight: 700;
        font-family: "Gotham Rounded", sans-serif;
      }

      .text-author {
        border: 1px solid #e0e0e0;
        max-width: 80%;
        margin: 0 auto;
        padding: 2em;
      }

      .tbl {
        border: 1px solid #e0e0e0;
      }

      .text-author h3 {
        margin-bottom: 0;
      }
      ul.social {
        padding: 0;
      }
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <img
                      src=${logoPath}
                      alt="OpenRoad Auto Group"
                      style="
                        width: 100px;
                        max-width: 600px;
                        height: auto;
                        margin: auto;
                        display: block;
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end tr -->
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="90%"
                class="tbl"
              >
                <tr>
                  <td
                    bgcolor="#44C8F5"
                    style="
                      padding: 20px 30px 20px 30px;
                      color: #fff;
                      font-weight: 350;
                      font-size: 24px;
                      text-align: center;
                    "
                  >
                    Transfer Verification
                  </td>
                </tr>

                <tr>
                   <td
                    bgcolor="#ffffff"
                    style="
                      padding: 40px 30px 40px 30px;
                      color: #333333;
                      background-color: #ffffff;
                      font-weight: 325;
                      line-height: 150%;
                      font-size: 12px;
                    "
                  >
                    To ${adminName},<br /><br />

                    You have transfered points with detail belows.<br /><br />

                    Time created: <br />
                    ${date} <br /><br />

                    Source: <br />
                    Member ID: ${member_id} <br />
                    Email: ${email_source} <br />
                    Name: ${source_fullname} <br /><br />
					
					Destination: <br />
                    Member ID: ${member_id_destination} <br />
                    Email: ${destination_email} <br />
                    Name: ${destination_fullname} <br /><br />                    

                    Description: ${description_transaksi} <br /><br />
                    Transfer amount: ${amount} point(s) <br /><br />
                    Please, click the link below to verify this transfer:
                    <br />
                    <a
                      href="${url}"
                      >${url}</a><br/><br/>
                    ___________________________________<br />
                    OpenRoad Auto Group - Loyalty Platform<br />
                    Copyright 2022 &copy; Club OpenRoad
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
	`;
};

const sendEmailRedemptionVerification = (
  req,
  member_source,
  transaksi,
  url,
  adminName
) => {
  const logoPath = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/orag_logo_1.png`;
  const { email_source, source_fullname } = member_source;
  const { point, member_id, transaction, description_transaksi } = transaksi;
  const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title>ORAG Loyalty Platform</title>

    <link
      href="http://fonts.cdnfonts.com/css/gotham-rounded"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
        font-style: normal;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }

      *[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }

      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }

      .primary {
        background: #17bebb;
      }
      .bg_white {
        background: #ffffff;
      }
      .bg_light {
        background: #f7fafa;
      }
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }
      .email-section {
        padding: 2.5em;
      }

      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
      .btn.btn-primary {
        border-radius: 5px;
        background: #17bebb;
        color: #ffffff;
      }
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }
      .btn-custom {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Gotham Rounded", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #17bebb;
      }

      table {
      }
      /*LOGO*/

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: #17bebb;
        font-size: 24px;
        font-weight: 700;
        font-family: "Gotham Rounded", sans-serif;
      }

      .text-author {
        border: 1px solid #e0e0e0;
        max-width: 80%;
        margin: 0 auto;
        padding: 2em;
      }

      .tbl {
        border: 1px solid #e0e0e0;
      }

      .text-author h3 {
        margin-bottom: 0;
      }
      ul.social {
        padding: 0;
      }
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <img
                      src=${logoPath}
                      alt="OpenRoad Auto Group"
                      style="
                        width: 100px;
                        max-width: 600px;
                        height: auto;
                        margin: auto;
                        display: block;
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end tr -->
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="90%"
                class="tbl"
              >
                <tr>
                  <td
                    bgcolor="#44C8F5"
                    style="
                      padding: 20px 30px 20px 30px;
                      color: #fff;
                      font-weight: 350;
                      font-size: 24px;
                      text-align: center;
                    "
                  >
                    Redemption Verification
                  </td>
                </tr>

                <tr>
                   <td
                    bgcolor="#ffffff"
                    style="
                      padding: 40px 30px 40px 30px;
                      color: #333333;
                      background-color: #ffffff;
                      font-weight: 325;
                      line-height: 150%;
                      font-size: 12px;
                    "
                  >
                    To ${adminName},<br /><br />

                    You have redeemed points with detail belows.<br /><br />

                    Time created: <br />
                    ${date} <br /><br />

                    Source: <br />
                    Member ID: ${member_id} <br />
                    Email: ${email_source} <br />
                    Name: ${source_fullname} <br /><br />

                    Transaction: ${transaction}
                    <br /><br />

                    Description: ${description_transaksi} <br /><br />
                    Redemption amount: ${point} point(s) <br /><br />
                    Please, click the link below to verify this redemption:
                    <br />
                    <a
                      href="${url}"
                      >${url}</a><br/><br />
                    ___________________________________<br />
                    OpenRoad Auto Group - Loyalty Platform<br />
                    Copyright 2022 &copy; Club OpenRoad
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
	`;
};

const sendEmailRedemptionNotification = (
  req,
  member_source,
  transaksi,
  dataContact
) => {
  const logoPath = `${req.protocol}://${req.get(
    'host'
  )}/public/assets/orag_logo_1.png`;
  const { source_fullname } = member_source;
  const { point, member_id, transaction, description_transaksi } = transaksi;
  const date = formatAMPM();
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title>ORAG Loyalty Platform</title>

    <link
      href="http://fonts.cdnfonts.com/css/gotham-rounded"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
        font-style: normal;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }

      *[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }

      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }

      .primary {
        background: #17bebb;
      }
      .bg_white {
        background: #ffffff;
      }
      .bg_light {
        background: #f7fafa;
      }
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }
      .email-section {
        padding: 2.5em;
      }

      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
      .btn.btn-primary {
        border-radius: 5px;
        background: #17bebb;
        color: #ffffff;
      }
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }
      .btn-custom {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Gotham Rounded", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      html,
      body {
        font-family: "Gotham Rounded", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #17bebb;
      }

      table {
      }
      /*LOGO*/

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: #17bebb;
        font-size: 24px;
        font-weight: 700;
        font-family: "Gotham Rounded", sans-serif;
      }

      .text-author {
        border: 1px solid #e0e0e0;
        max-width: 80%;
        margin: 0 auto;
        padding: 2em;
      }

      .tbl {
        border: 1px solid #e0e0e0;
      }

      .text-author h3 {
        margin-bottom: 0;
      }
      ul.social {
        padding: 0;
      }
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <img
                      src=${logoPath}
                      alt="OpenRoad Auto Group"
                      style="
                        width: 100px;
                        max-width: 600px;
                        height: auto;
                        margin: auto;
                        display: block;
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end tr -->
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="90%"
                class="tbl"
              >
                <tr>
                  <td
                    bgcolor="#44C8F5"
                    style="
                      padding: 20px 30px 20px 30px;
                      color: #fff;
                      font-weight: 350;
                      font-size: 24px;
                      text-align: center;
                    "
                  >
                    Redemption Notification
                  </td>
                </tr>

                <tr>
                  <td
                    bgcolor="#ffffff"
                    style="
                      padding: 40px 30px 40px 30px;
                      color: #333333;
                      background-color: #ffffff;
                      font-weight: 325;
                      line-height: 150%;
                      font-size: 12px;
                    "
                  >
                    To ${source_fullname},<br /><br />

                    Your points has been deducted from a redemption with details
                    such as below.<br /><br />

                    Time created: <br />
                    ${date} <br /><br />

                    Transaction: ${transaction}
                    <br /><br />

                    Description: ${description_transaksi} <br /><br />

                    Redemption amount: ${point} point(s) <br />

                    ___________________________________<br /><br />
                    
                    Need help? Contact us<br />
                    ${dataContact}<br />

                    ___________________________________<br /><br />
                    OpenRoad Auto Group - Loyalty Platform<br />
                    Copyright 2022 &copy; Club OpenRoad
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
	`;
};

function formatAMPM() {
  const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Canada/Pacific',
  });
  return nDate;
}

exports.sendEmailVerification = sendEmailVerification;
exports.sendEmailMemberActivation = sendEmailMemberActivation;
exports.sendEmailForgotPassword = sendEmailForgotPassword;
exports.sendEmailRedemptionNotification = sendEmailRedemptionNotification;
exports.sendEmailRedemptionVerification = sendEmailRedemptionVerification;
exports.sendEmailTransferVerification = sendEmailTransferVerification;
exports.sendEmailTransferNotificationSource =
  sendEmailTransferNotificationSource;
exports.sendEmailTransferNotificationDestination =
  sendEmailTransferNotificationDestination;
exports.sendEmailAddPointVerification = sendEmailAddPointVerification;
exports.sendAddPointNotification = sendAddPointNotification;
