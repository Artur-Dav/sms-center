import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'admin',
          redirect: '/admin/dashboard',
          meta: {
            requiresAuth: true,
          }
        },

        // =============================================================================
        // @@@@@@ ======= New Router 08.27======== @@@@@@@
        // =============================================================================
        // =============================================================================
        // ========ADMIN ROUTES========
        // =============================================================================

        // ===============================================================
        // Reseller invoice
        // ===============================================================
        {
          path: '/admin/reseller',
          name: 'Admin-reseller',
          redirect: { name: 'admin-reseller-list' },
          component: () => import('./views/admin/reseller/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-reseller-list',
              component: () => import('./views/admin/reseller/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Resellers',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Resellers', active: true }
                ],
              }
            },
            {
              path: 'add',
              name: 'admin-reseller-add',
              component: () => import('./views/admin/reseller/Add.vue'),
              meta: {
                requiresAuth: true,
                pageTitle: 'Resellers',
                rule: 'editor',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Resellers', url: '/admin/reseller' },
                  { title: 'Add Reseller', active: true },
                ]
              },
            },
            {
              path: 'add-manual-payment',
              name: 'admin-reseller-add-manual-payment',
              component: () => import('./views/admin/reseller/AddManualPayment.vue'),
              meta: {
                requiresAuth: true,
                pageTitle: 'Resellers',
                rule: 'editor',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Resellers', url: '/admin/reseller' },
                  { title: 'Add Manual Payment', active: true }
                ]
              },
            },
            {
              path: ':id/transaction-history',
              name: 'admin-reseller-transaction-history',
              redirect: { name: 'admin-reseller-transaction-history-list' },
              component: () => import('./views/admin/reseller/transactionHistory/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-reseller-transaction-history-list',
                  component: () => import('./views/admin/reseller/transactionHistory/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Resellers',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Resellers', url: '/admin/reseller' },
                      { title: 'Transaction History', active: true }
                    ]
                  }
                }
              ]
            },
            {
              path: ':id/invoice-history',
              name: 'admin-reseller-invoice-history',
              redirect: { name: 'admin-reseller-invoice-history-list' },
              component: () => import('./views/admin/reseller/invoiceHistory/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-reseller-invoice-history-list',
                  component: () => import('./views/admin/reseller/invoiceHistory/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Resellers',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Resellers', url: '/admin/reseller' },
                      { title: 'Invoice History', active: true }
                    ]
                  }
                }
              ]
            }
          ]
        },

        // ===============================================================
        // Billing Invoice
        // ===============================================================
        {
          path: '/admin/billing',
          name: 'admin-billing',
          redirect: { name: 'admin-billing-invoice-list' }
        },
        {
          path: '/admin/billing/invoice',
          name: 'admin-billing-invoice',
          redirect: { name: 'admin-billing-invoice-list' },
          component: () => import('./views/admin/billing/invoice/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-billing-invoice-list',
              component: () => import('./views/admin/billing/invoice/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Billing',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Invoice', active: true }
                ]
              },
            },
            {
              path: 'add',
              name: 'admin-billing-invoice-add',
              component: () => import('./views/admin/billing/invoice/Add.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Billing',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Invoice', url: '/admin/billing/invoice/list' },
                  { title: 'Add', active: true }
                ]
              },
            }
          ]
        },

        // ===============================================================
        // Billing Payment
        // ===============================================================
        {
          path: '/admin/billing/payment',
          name: 'admin-billing-payment',
          redirect: { name: 'admin-billing-payment-list' },
          component: () => import('./views/admin/billing/payment/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-billing-payment-list',
              component: () => import('./views/admin/billing/payment/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Billing',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Payment', active: true }
                ]
              },
            },
            {
              path: 'add-manual-payment',
              name: 'admin-billing-payment-add',
              component: () => import('./views/admin/billing/payment/Add.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Billing',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Payment', url: '/admin/billing/payment' },
                  { title: 'Create', active: true }
                ]
              },
            }
          ]
        },

        // ===============================================================
        // Template Approval
        // ===============================================================
        {
          path: '/admin/template-approval',
          name: 'admin-template-approval',
          redirect: { name: 'admin-template-approval-list' },
          component: () => import('./views/admin/template-approval/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-template-approval-list',
              component: () => import('./views/admin/template-approval/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Template Approval',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Template Approval', active: true }
                ]
              },
            }
          ]
        },
        {
          path: '/admin/dashboard',
          name: 'Admin-dashboard',
          component: () => import('./views/admin/dashboard/admindashboard.vue'),
          meta: {
            requiresAuth: true,
            rule: 'admin',
            pageTitle: 'Dashboard',
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Dashboard', active: true }
            ]
          }
        },

        // ===============================================================
        // DID
        // ===============================================================
        {
          path: '/admin/did',
          name: 'admin-did',
          redirect: { name: 'admin-did-list' },
          component: () => import('./views/admin/did/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-did-list',
              component: () => import('./views/admin/did/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'DID',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'DID', active: true }
                ]
              },
            },
            {
              path: 'import-log',
              name: 'admin-did-import-log',
              redirect: { name: 'admin-did-import-log-list' },
              component: () => import('./views/admin/did/import-log/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-did-import-log-list',
                  component: () => import('./views/admin/did/import-log/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'DID',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'DID', url: '/admin/did' },
                      { title: 'Import Log', active: true }
                    ]
                  },
                }
              ]
            },
            {
              path: 'import-did',
              name: 'admin-did-import-did',
              redirect: { name: 'admin-did-import-did-import' },
              component: () => import('./views/admin/did/import-did/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'import',
                  name: 'admin-did-import-did-import',
                  component: () => import('./views/admin/did/import-did/Import.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'DID',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'DID', url: '/admin/did' },
                      { title: 'Import DID', active: true }
                    ]
                  },
                }
              ]
            }
          ]
        },

        // ===============================================================
        // Clients Companies
        // ===============================================================
        {
          path: '/admin/clients',
          name: 'admin-clients',
          redirect: { name: 'admin-companies-list' }
        },
        {
          path: '/admin/clients/companies',
          name: 'admin-companies',
          redirect: { name: 'admin-companies-list' },
          component: () => import('./views/admin/clients/companies/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-companies-list',
              component: () => import('./views/admin/clients/companies/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Clients',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Companies', active: true }
                ]
              }
            },
            {
              path: 'add',
              name: 'admin-companies-add',
              component: () => import('./views/admin/clients/companies/Add.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Clients',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Companies', url: '/admin/clients/companies' },
                  { title: 'Add', active: true }
                ]
              }
            },
            {
              path: 'add-manual-payment',
              name: 'admin-companies-add-manual-payment',
              component: () => import('./views/admin/clients/companies/AddManualPayment.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Clients',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Companies', url: '/admin/clients/companies' },
                  { title: 'Add Manual Payment', active: true }
                ]
              }
            },
            {
              path: 'edit/:id',
              name: 'admin-companies-edit',
              component: () => import('./views/admin/clients/companies/Edit.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Clients',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Companies', url: '/admin/clients/companies' },
                  { title: 'Edit', active: true }
                ]
              }
            },
            {
              path: ':id/payment-history',
              name: 'admin-companies-payment-history',
              redirect: { name: 'admin-companies-payment-history-list' },
              component: () => import('./views/admin/clients/companies/paymentHistory/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-companies-payment-history-list',
                  component: () => import('./views/admin/clients/companies/paymentHistory/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Clients',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Companies', url: '/admin/clients/companies' },
                      { title: 'Payment History', active: true }
                    ]
                  }
                }
              ]
            },
            {
              path: ':id/transaction-history',
              name: 'admin-companies-transaction-history',
              redirect: { name: 'admin-companies-transaction-history-list' },
              component: () => import('./views/admin/clients/companies/transactionHistory/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-companies-transaction-history-list',
                  component: () => import('./views/admin/clients/companies/transactionHistory/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Clients',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Companies', url: '/admin/clients/companies' },
                      { title: 'Transaction History', active: true }
                    ]
                  }
                }
              ]
            },
            {
              path: ':id/invoice-history',
              name: 'admin-companies-invoice-history',
              redirect: { name: 'admin-companies-invoice-history-list' },
              component: () => import('./views/admin/clients/companies/invoiceHistory/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-companies-invoice-history-list',
                  component: () => import('./views/admin/clients/companies/invoiceHistory/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Clients',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Companies', url: '/admin/clients/companies' },
                      { title: 'Invoice History', active: true }
                    ]
                  }
                }
              ]
            },
            {
              path: ':id/company-accounts',
              name: 'admin-companies-company-accounts',
              redirect: { name: 'admin-companies-company-accounts-list' },
              component: () => import('./views/admin/clients/companies/companyAccounts/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-companies-company-accounts-list',
                  component: () => import('./views/admin/clients/companies/companyAccounts/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Clients',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Companies', url: '/admin/clients/companies' },
                      { title: 'Company Accounts', active: true }
                    ]
                  }
                },
                {
                  path: 'add',
                  name: 'admin-companies-company-accounts-add',
                  component: () => import('./views/admin/clients/companies/companyAccounts/Add.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Clients',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Companies', url: '/admin/clients/companies' },
                      { title: 'Company Accounts', url: '/admin/clients/companies' },
                      { title: 'Add', active: true }
                    ]
                  }
                },
                {
                  path: 'edit/:user_id',
                  name: 'admin-companies-company-accounts-edit',
                  component: () => import('./views/admin/clients/companies/companyAccounts/Edit.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Clients',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Companies', url: '/admin/clients/companies' },
                      { title: 'Company Accounts', url: '/admin/clients/companies' },
                      { title: 'Edit', active: true }
                    ]
                  }
                }
              ]
            }
          ]
        },

        // ===============================================================
        // Clients Users
        // ===============================================================
        {
          path: '/admin/clients/users',
          name: 'admin-users',
          redirect: { name: 'admin-users-list' },
          component: () => import('./views/admin/clients/users/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-users-list',
              component: () => import('./views/admin/clients/users/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Clients',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Users', active: true }
                ]
              }
            },
            {
              path: 'edit/:id',
              name: 'admin-users-edit',
              component: () => import('./views/admin/clients/users/Edit.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Clients',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Users', url: '/admin/clients/users/list' },
                  { title: 'Edit', active: true }
                ]
              }
            }
          ]
        },

        // ===============================================================
        // SMSC Connections
        // ===============================================================
        {
          path: '/admin/smsc-connection',
          name: 'admin-smsc-connections',
          redirect: { name: 'admin-smsc-connections-list' },
          component: () => import('./views/admin/smsc-connections/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-smsc-connections-list',
              component: () => import('./views/admin/smsc-connections/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'SMSC Connections',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'SMSC Connections', active: true }
                ]
              }
            },
            {
              path: 'add',
              name: 'admin-smsc-connections-add',
              component: () => import('./views/admin/smsc-connections/Add.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'SMSC Connections',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'SMSC Connections', url: '/admin/smsc-connection' },
                  { title: 'Add', active: true }
                ]
              }
            },
            {
              path: 'edit/:id',
              name: 'admin-smsc-connections-edit',
              component: () => import('./views/admin/smsc-connections/Edit.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'SMSC Connections',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'SMSC Connections', url: '/admin/smsc-connection' },
                  { title: 'Edit', active: true }
                ]
              }
            }
          ]
        },

        // ===============================================================
        // Filters
        // ===============================================================
        {
          path: '/admin/filter',
          name: 'admin-filters',
          redirect: { name: 'admin-filters-list' },
          component: () => import('./views/admin/filters/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-filters-list',
              component: () => import('./views/admin/filters/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Filters',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Filters', active: true }
                ]
              },
            }
          ]
        },

        // ===============================================================
        // Vendors
        // ===============================================================
        {
          path: '/admin/vendor',
          name: 'admin-vendors',
          redirect: { name: 'admin-vendors-list' },
          component: () => import('./views/admin/vendors/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-vendors-list',
              component: () => import('./views/admin/vendors/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Vendors',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Vendors', active: true }
                ]
              },
            },
            {
              path: 'add',
              name: 'admin-vendors-add',
              component: () => import('./views/admin/vendors/Add.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Vendors',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Vendors', url: '/admin/vendor' },
                  { title: 'Add', active: true }
                ]
              },
            },
            {
              path: 'edit/:id',
              name: 'admin-vendors-edit',
              component: () => import('./views/admin/vendors/Edit.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Vendors',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Vendors', url: '/admin/vendor' },
                  { title: 'Edit', active: true }
                ]
              },
            },
            {
              path: ':id/did',
              name: 'admin-vendors-did',
              redirect: { name: 'admin-vendors-did-list' },
              component: () => import('./views/admin/vendors/did/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-vendors-did-list',
                  component: () => import('./views/admin/vendors/did/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'DID', active: true }
                    ]
                  }
                },
                {
                  path: 'add',
                  name: 'admin-vendors-did-add',
                  component: () => import('./views/admin/vendors/did/Add.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'DID', url: '/admin/vendor/:id/did/list' },
                      { title: 'Add', active: true }
                    ]
                  }
                },
                {
                  path: 'edit/:did',
                  name: 'admin-vendors-did-edit',
                  component: () => import('./views/admin/vendors/did/Edit.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'DID', url: '/admin/vendor/:id/did/list' },
                      { title: 'Edit', active: true }
                    ]
                  }
                }
              ]
            },
            {
              path: ':id/smsc-bind',
              name: 'admin-vendors-smsc-bind',
              redirect: { name: 'admin-vendors-smsc-bind-list' },
              component: () => import('./views/admin/vendors/smscBind/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-vendors-smsc-bind-list',
                  component: () => import('./views/admin/vendors/smscBind/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'SMSC Bind', active: true }
                    ]
                  }
                },
                {
                  path: 'add',
                  name: 'admin-vendors-smsc-bind-add',
                  component: () => import('./views/admin/vendors/smscBind/Add.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'SMSC Bind', url: '/admin/vendor/:id/did/list' },
                      { title: 'Add', active: true }
                    ]
                  }
                },
                {
                  path: 'edit/:prod_id',
                  name: 'admin-vendors-smsc-bind-edit',
                  component: () => import('./views/admin/vendors/smscBind/Edit.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'SMSC Bind', url: '/admin/vendor/:id/did/list' },
                      { title: 'Edit', active: true }
                    ]
                  }
                },
                {
                  path: ':rate_id/rate-add',
                  name: 'admin-vendors-smsc-bind-rate-add',
                  component: () => import('./views/admin/vendors/smscBind/AddRate.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'SMSC Bind', url: '/admin/vendor/:id/did/list' },
                      { title: 'Add Rate', active: true }
                    ]
                  }
                }
              ]
            },
            {
              path: ':id/rate-deck',
              name: 'admin-vendors-rate-deck',
              redirect: { name: 'admin-vendors-rate-deck-list' },
              component: () => import('./views/admin/vendors/rateDeck/Index.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
              },
              children: [
                {
                  path: 'list',
                  name: 'admin-vendors-rate-deck-list',
                  component: () => import('./views/admin/vendors/rateDeck/List.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'Rate Deck', active: true }
                    ]
                  }
                },
                {
                  path: 'add-edit-prefix',
                  name: 'admin-vendors-rate-deck-add-prefix',
                  component: () => import('./views/admin/vendors/rateDeck/components/add-edit-prefix.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'Rate Deck', url: '/admin/vendor' },
                      { title: 'Change', active: true }
                    ]
                  }
                },
                {
                  path: 'add-edit-mncmcc',
                  name: 'admin-vendors-rate-deck-add-mncmcc',
                  component: () => import('./views/admin/vendors/rateDeck/components/add-edit-mncmcc.vue'),
                  meta: {
                    requiresAuth: true,
                    rule: 'editor',
                    pageTitle: 'Vendors',
                    breadcrumb: [
                      { title: 'Home', url: '/' },
                      { title: 'Vendors', url: '/admin/vendor' },
                      { title: 'Rate Deck', url: '/admin/vendor' },
                      { title: 'Change', active: true }
                    ]
                  }
                }
              ]
            }
          ]
        },

        // ===============================================================
        // Usage report
        // ===============================================================
        {
          path: '/admin/usage-report',
          name: 'admin-usage-report',
          redirect: { name: 'admin-usage-report-list' },
          component: () => import('./views/admin/usage-report/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-usage-report-list',
              component: () => import('./views/admin/usage-report/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Usage Report',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Usage Report', active: true }
                ]
              },
            }
          ]
        },

        // ===============================================================
        // Bulk Report
        // ===============================================================
        {
          path: '/admin/bulk-report',
          name: 'admin-bulk-report',
          redirect: { name: 'admin-bulk-report-list' },
          component: () => import('./views/admin/bulk-report/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-bulk-report-list',
              component: () => import('./views/admin/bulk-report/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Bulk Report',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Bulk Report', active: true }
                ]
              },
            }
          ]
        },

        // ===============================================================
        // Default rate
        // ===============================================================
        {
          path: '/admin/rate',
          name: 'admin-default-rate',
          redirect: { name: 'admin-default-rate-list' },
          component: () => import('./views/admin/rate/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'editor'
          },
          children: [
            {
              path: 'list',
              name: 'admin-default-rate-list',
              component: () => import('./views/admin/rate/List.vue'),
              meta: {
                requiresAuth: true,
                rule: 'editor',
                pageTitle: 'Default Rate',
                breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Default Rate', active: true }
                ]
              },
            }
          ]
        },
        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: '/pages/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Profile', active: true }
            ],
            pageTitle: 'Profile',
            rule: 'editor'
          }
        },
        {
          path: '/pages/user-settings',
          name: 'page-user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            rule: 'editor'
          }
        },
        {
          path: '/pages/setting',
          name: 'page-settings',
          component: () => import('@/views/pages/user-settings/Setting.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            rule: 'editor'
          }
        },
        {
          path: '/pages/topup',
          name: 'page-topup',
          component: () => import('@/views/pages/user-settings/Topup.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Top-Up' }
            ],
            pageTitle: 'Top-Up',
            rule: 'editor'
          }
        },
        {
          path: '/pages/faq',
          name: 'page-faq',
          component: () => import('@/views/pages/Faq.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'FAQ', active: true }
            ],
            pageTitle: 'FAQ',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base',
          name: 'page-knowledge-base',
          component: () => import('@/views/pages/KnowledgeBase.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', active: true }
            ],
            pageTitle: 'KnowledgeBase',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category',
          name: 'page-knowledge-base-category',
          component: () => import('@/views/pages/KnowledgeBaseCategory.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category/question',
          name: 'page-knowledge-base-category-question',
          component: () => import('@/views/pages/KnowledgeBaseCategoryQuestion.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', url: '/pages/knowledge-base/category' },
              { title: 'Question', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/search',
          name: 'page-search',
          component: () => import('@/views/pages/Search.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Search', active: true }
            ],
            pageTitle: 'Search',
            rule: 'editor'
          }
        },
        {
          path: '/pages/invoice',
          name: 'page-invoice',
          component: () => import('@/views/pages/Invoice.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Invoice', active: true }
            ],
            pageTitle: 'Invoice',
            rule: 'editor'
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/auth/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    const token = localStorage.getItem('user-token')

    if (token) {
      next({ name: 'admin' })
    } else {
      next()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/IsAuthenticated']) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
