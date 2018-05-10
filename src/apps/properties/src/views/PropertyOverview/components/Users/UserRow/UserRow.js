import { PureComponent } from 'react'
import styles from './UserRow.less'

import { zConfirm } from '../../../../../../../../shell/store/confirm'

const OWNER_ZUID = '31-71cfc74-0wn3r'

export default class UserRow extends PureComponent {
  render() {
    return (
      <article className={styles.UserRow}>
        <span className={styles.name}>
          {this.props.firstName} {this.props.lastName}
          {!this.props.lastName &&
            !this.props.firstName && <em>Invited User</em>}
        </span>
        <span className={styles.role}>
          {this.props.role && this.props.role.systemRole.ZUID === OWNER_ZUID ? (
            <i className="fa fa-star" aria-hidden="true" />
          ) : null}
          {this.props.role && this.props.role.name}
        </span>
        <span className={styles.email}>{this.props.email}</span>
        <span className={styles.action}>
          {this.props.pending ? (
            <Button onClick={() => this.confirm(this.props.inviteZUID)}>
              Revoke Invite
            </Button>
          ) : null}
          {!this.props.pending &&
          this.props.role &&
          this.props.role.systemRole.ZUID !== OWNER_ZUID ? (
            <Button
              className={styles.pullButton}
              onClick={() => this.removeUser(user, this.props.role.ZUID)}
            >
              Remove User
            </Button>
          ) : null}
        </span>
      </article>
    )
  }
  removeUser = (userZUID, roleZUID) => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to remove this user?',
        callback: result => {
          if (result) {
            // removes user if confirmed
            if (result) {
              this.props
                .dispatch(removeUser(userZUID, roleZUID))
                .then(data => {
                  this.props.dispatch(
                    notify({
                      message: 'User Removed',
                      type: 'success'
                    })
                  )
                  this.props.dispatch(
                    removeSiteUser(userZUID, this.props.siteZUID)
                  )
                })
                .catch(err => {
                  this.props.dispatch(
                    notify({
                      message: 'Error Removing User',
                      type: 'error'
                    })
                  )
                })
            }
          }
        }
      })
    )
  }
  confirm = inviteZUID => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to revoke this users invite?',
        callback: result => {
          if (result) {
            // removes invite if confirmed
            this.props.dispatch(cancelInvite(inviteZUID)).then(data => {
              this.props.dispatch(
                removeSiteUser(data.data.ZUID, this.props.site.ZUID)
              )
            })
            this.props.dispatch(
              notify({
                message: 'User Invite Cancelled',
                type: 'success'
              })
            )
          }
        }
      })
    )
  }
}