import PropsTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </>
)

LoginForm.propTypes = {
  handleLogin: PropsTypes.func.isRequired,
  handleUsernameChange: PropsTypes.func.isRequired,
  handlePasswordChange: PropsTypes.func.isRequired,
  username: PropsTypes.string.isRequired,
  password: PropsTypes.string.isRequired,
}

export default LoginForm
