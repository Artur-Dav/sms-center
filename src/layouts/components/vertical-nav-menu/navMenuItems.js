/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
==========================================================================================*/

const base_url = '/admin'

export default [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },


  //Admin08.27
  {
    header: 'Admin',
    icon: 'PackageIcon',
    i18n: 'Admin',
    items: [
      {
        url: `${base_url}/dashboard`,
        name: 'Dashboard',
        icon: 'HomeIcon',
        i18n: 'Dashboard'
      },
      {
        url: `${base_url}/reseller`,
        name: 'Resellers',
        icon: 'UserIcon',
        i18n: 'Resellers',
      },
      {
        url: `${base_url}/template-approval`,
        name: 'Template Approval',
        icon: 'UserIcon',
        i18n: 'Template Approval',
      },
      {
        url: `${base_url}`,
        name: 'Billing',
        icon: 'FileIcon',
        i18n: 'Billing',
        submenu: [
          {
            url: `${base_url}/billing/invoice`,
            name: 'Invoice',
            icon: 'FileIcon',
            i18n: 'Invoice'
          },
          {
            url: `${base_url}/billing/payment`,
            name: 'Payment',
            icon: 'FileIcon',
            i18n: 'Payment'
          }
        ]
      },
      // {
      //   url: `${base_url}`,
      //   name: 'Invoice',
      //   icon: 'FileIcon',
      //   i18n: 'Invoice',
      //   submenu: [
      //     {
      //       url: `${base_url}/company-invoice/list`,
      //       name: 'Invoice',
      //       icon: 'FileIcon',
      //       i18n: 'Company Invoice'
      //     },
      //     {
      //       url: `${base_url}/reseller-invoice/list`,
      //       name: 'Invoice',
      //       icon: 'FileIcon',
      //       i18n: 'Reseller Invoice'
      //     }
      //   ]
      // },
      // {
      //   url: null,
      //   name: 'Payment',
      //   icon: 'CreditCardIcon',
      //   i18n: 'Payment',
      //   submenu: [
      //     {
      //       url: `${base_url}/company-payment/list`,
      //       name: 'Company Payment',
      //       icon: 'CreditCardIcon',
      //       i18n: 'Company Payment'
      //     },
      //     {
      //       url: `${base_url}/reseller-payment/list`,
      //       name: 'Reseller Payment',
      //       icon: 'CreditCardIcon',
      //       i18n: 'Reseller Payment'
      //     }
      //   ]
      // },
      {
        url: `${base_url}/bulk-report`,
        name: 'Bulk Report',
        icon: 'GridIcon',
        i18n: 'Bulk Report'
      },
      {
        url: `${base_url}/usage-report`,
        name: 'Usage Report',
        icon: 'GridIcon',
        i18n: 'Usage Report'
      },
      {
        url: `${base_url}/did`,
        name: 'DID',
        icon: 'UserIcon',
        i18n: 'DID',
      },
      {
        url: `${base_url}/clients`,
        name: 'Clients',
        icon: 'UserIcon',
        i18n: 'Clients',
        submenu: [
          {
            url: `${base_url}/clients/companies`,
            name: 'Companies',
            icon: 'UserIcon',
            i18n: 'Companies',
          },
          {
            url: `${base_url}/clients/users`,
            name: 'Users',
            icon: 'UserIcon',
            i18n: 'Users',
          }
        ]
      },
      {
        url: `${base_url}/smsc-connection`,
        name: 'SMSC Connections',
        icon: 'UserIcon',
        i18n: 'SMSC Connections',
      },
      // {
      //   url: `${base_url}/filter`,
      //   name: 'Filters',
      //   icon: 'UserIcon',
      //   i18n: 'Filters',
      // },
      {
        url: `${base_url}/vendor`,
        name: 'Vendors',
        icon: 'UserIcon',
        i18n: 'Vendors',
      },
      // {
      //   url: `${base_url}/rate`,
      //   name: 'Default Rate',
      //   icon: 'HelpCircleIcon',
      //   i18n: 'Default Rate'
      // }
    ]
  },
  /*
 //Reseller08.27
 {
   header: 'Reseller',
   icon: 'PackageIcon',
   i18n: 'Reseller',
   items: [
     {
       url: '/reseller/dashboard',
       name: 'ResellerDashboard',        
       icon: 'HomeIcon',
       i18n: 'Dashboard'
     },
     {
       url: '/reseller/company',
       name: 'Companies',        
       icon: 'ListIcon',
       i18n: 'Companies'
     },
     {
       url: '/reseller/user',
       name: 'Company-User',        
       icon: 'UserPlusIcon',
       i18n: 'Users'
     },

     {
       url: '/reseller/anipool',
       name: 'ANI Pool',        
       icon: 'CheckSquareIcon',
       i18n: 'ANI Pool'
     },

     {
       url: '/reseller/payment',
       name: 'ResellerPayment',        
       icon: 'CreditCardIcon',
       i18n: 'Payment'
     },
     
     {
       url: '/reseller/invoice',
       name: 'Invoice',        
       icon: 'FileIcon',
       i18n: 'Invoice'
     }
     
   ]
 }, 
 //User portal -company admin menu 08.27
 {
   header: 'Company',
   icon: 'PackageIcon',
   i18n: 'Company',
   items: [
     {
       url: '/company/dashboard',
       name: 'Dashboard',        
       icon: 'HomeIcon',
       i18n: 'Dashboard'
     },

     {
       url: '/company/chat',
       name: 'Messaging',
       icon: 'MessageSquareIcon',
       i18n: 'Messaging'
     },

     {
       url: null,
       name: 'Campaign',        
       tagColor: 'primary',
       icon: 'ListIcon',
       i18n: 'Campaign',
       submenu: [
         {
           url: '/company/campaign/basic/list',
           name: 'Basic',            
           i18n: 'Basic'
         },
         {
           url: '/company/campaign/conversational/list',
           name: 'Conversational',
           i18n: 'Conversational'
         },
         {
           url: '/company/campaign/p2p/list',
           name: 'Peer2Peer',
           slug: 'data-list-thumb-view',
           i18n: 'Peer2Peer'
         }
       ]
     },      

     {
       url: '/company/smsworkflow',
       name: 'SMS Workflow',        
       icon: 'InfoIcon',
       i18n: 'SMS Workflow'
     },

     {
       url: '/company/template',
       name: 'SMS Template',        
       icon: 'SearchIcon',
       i18n: 'SMS Template'
     },

     {
       url: '/company/msgtemplate',
       name: 'Message Template',        
       icon: 'ArchiveIcon',
       i18n: 'Message Template'
     },

     {
       url: '/company/tipsresponse',
       name: 'Tips Response',        
       icon: 'PlusCircleIcon',
       i18n: 'Tips Response'
     },

     {
       url: '/company/callflow',
       name: 'Call Flow',        
       icon: 'CalendarIcon',
       i18n: 'Call Flow'
     },

     {
       url: '/company/auto',
       name: 'Auto Responding',        
       icon: 'BoldIcon',
       i18n: 'Auto Responding'
     },
     
     {
       url: '/company/mynum',
       name: 'My Number',        
       icon: 'MonitorIcon',
       i18n: 'MyNumber'
     },

     {
       url: '/company/list',
       name: 'Contact-list',        
       icon: 'FileTextIcon',
       i18n: 'ContactList'
     },

     {
       url: null,
       name: 'Analytic',        
       tagColor: 'primary',
       icon: 'MoreHorizontalIcon',
       i18n: 'Analytic',
       submenu: [
         {
           url: '/company/analytic/report',
           name: 'Usage Report',            
           i18n: 'Usage Report'
         },
         {
           url: '/company/analytic/smslog',
           name: 'SMS Log',            
           i18n: 'SMS Log'
         }          
       ]
     },

     {
       url: '/company/numlist',
       name: 'Numbers',        
       icon: 'EditIcon',
       i18n: 'Numbers'
     },

     {
       url: '/company/invoice',
       name: 'Invoice',        
       icon: 'FileIcon',
       i18n: 'Invoice'
     },

     {
       url: '/company/payment',
       name: 'Payment',        
       icon: 'CreditCardIcon',
       i18n: 'Payment'
     },

     {
       url: '/company/user',
       name: 'User',
       icon: 'UserIcon',
       i18n: 'User'
     }

   ]
 },

 // User portal company user menu 08.27
 {
   header: 'User',
   icon: 'PackageIcon',
   i18n: 'User',
   items: [
     {
       url: '/user/dashboard',
       name: 'Dashboard',        
       icon: 'HomeIcon',
       i18n: 'Dashboard'
     },

     {
       url: '/user/chat',
       name: 'Messaging',
       icon: 'MessageSquareIcon',
       i18n: 'Messaging'
     },

     {
       url: '/user/campaign',
       name: 'Campaigns',        
       icon: 'ListIcon',
       i18n: 'Campaigns'
     },

     {
       url: '/user/contact',
       name: 'Contact',        
       icon: 'MonitorIcon',
       i18n: 'Contact'
     },

     {
       url: '/user/smslog',
       name: 'SMS Log',        
       icon: 'TagIcon',
       i18n: 'SMS Log'
     },

     {
       url: '/user/report',
       name: 'Report',        
       icon: 'AlertCircleIcon',
       i18n: 'Report'
     }   
   ]
 },


 // Company user menu 08.27
 {
   header: 'Company User',
   icon: 'PackageIcon',
   i18n: 'Company User',
   items: [
     {
       url: 'null',
       name: 'SMS Panel',        
       icon: 'DiscIcon',
       i18n: 'SMS Panel'
     },

     {
       url: '/comuser/userp2p',
       name: 'P2P Campaign',        
       icon: 'BookIcon',
       i18n: 'P2P Campaign'
     },

     {
       url: '/comuser/smslog',
       name: 'SMS Log',        
       icon: 'TagIcon',
       i18n: 'SMS Log'
     },

     {
       url: '/comuser/comreport',
       name: 'Report',        
       icon: 'AlertCircleIcon',
       i18n: 'Report'
     }
   ]
 }*/
]

