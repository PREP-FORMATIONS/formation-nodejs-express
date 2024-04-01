# Asynchronous programming

## 1. Example of synchronous or blocking program
When the first line is running, the program blocks. Meaning the second line has to wait until the first instruction is fully executed

```js
console.log("Before")
console.log("After")
```



## 2.Asynchronous or non blocking programs
```js
console.log("Before");
setTimeout(()=>{
  // Simulating reading into the database
  console.log("Reading a user from a database...")
},2000)
console.log("After")
```
The `setTimeout` function is an example of an asychronous or non-blocking function. It will schedule a task to be performed in the futur.
Meaning 2 seconds after. It does wait or block.

Asynchronous doesn't mean **concurrent** or **multi-threaded**. 

Here we have a single thread that:
- Executes the first line
- Then schedule the execution of the seconde line
- Executes the third line
- After that, when 2 seconds are elapsed then it will execute the instructions inside the timeout.


**Example in real life**

- In a **synchronous/blocking restaurant**, the waiter come to your table, takes the orders and brings it to the kitchen, and then waits until your food is ready before moving on to the next table.
- In an **asynchronous/non-blocking restaurant**, the waiter doesn't wait to the kitchen. While chef is preparing your meal, the waiter will move on to the next table to take their order.
What is important here is that we have a single waiter or waitress. This is like a single thread in a program. We don't have multiple threads or concurrency.
In `node` programs whenever you're dealing with an operation that involves network or disk access, you're dealing with **asynchronous code**.

What we're going to learn here is how to right asynchronous in a clean and maintainable way.

## 3. More realistic program

It's a case of a function that tries to get users information from the database.
```js
console.log("Before");
const user=getUsers(1)

// This won't work because the operation is asynchronous. This gives undefined.
// It's because the function is executed 2 seconds after. So the returned value is not available at the moment we console.log
// When we access a database, it's take some time. A bunch of milliseconds.
// We are using setTimeout as a database access simulations
console.log(user)
console.log("After");

function getUsers(id){
  setTimeout(()=>{
    console.log("Reading a user from a database...")
    return {id:id, githubUsername:'csev'}
  },2000)
}
```

## 4. How then can we access the data from asynchronous code?

- `Callbacks`
- `Promises`
- `Async/await` : Syntactical sugar for promises.


### 4.1. Callback

```js
console.log("Before");
getUsers(1,function(user){
  console.log(user)
})
console.log("After");

function getUsers(id,callback){
  setTimeout(()=>{
    console.log("Reading a user from a database...")
    callback({id:id, githubUsername:'csev'})
  },2000)
}
```

**Exercice 1**
 For this user, try to grab all his repositories
Github api : https://api.github.com/users/csev/repos

Something like this 
```js
function getRepositories(username){
  const url=`https://api.github.com/users/${username}/repos`;
  return ['repo1','repo2','repo3','repo4']
}
```

**Solution**
```js
console.log("Before");
getUsers(1,function(user){
  console.log("user : ",user)
  getRepositories(user.githubUsername,function(repos){
    console.log(repos)
  })
})
console.log("After");

function getUsers(id,callback){
  setTimeout(()=>{
    console.log("Reading a user from a database...")
    callback({id:id, githubUsername:'csev'})
  },2000)
}

function getRepositories(username,callback){
  const url=`https://api.github.com/users/${username}/repos`;
  setTimeout(()=>{
    console.log("Fetching users repositories")
    callback(['repo1','repo2','repo3','repo4'])
  },2000)
}
```

**Exercice 2**
Pour chaque le premier repo, afficher toutes les branches



**Solution E2**
```js
console.log("Before");
getUsers(1,function(user){
 getRepositories(user.githubUsername,function(repos){
  getFirstRepoBranches(user.githubUsername,repos[0],function(branches){
   console.log(branches)
  })
 })
})
console.log("After");

function getUsers(id,callback){
 setTimeout(()=>{
  console.log("Reading a user from a database...")
  callback({id:id, githubUsername:'csev'})
 },2000)
}

function getRepositories(username,callback){
 const url=`https://api.github.com/users/${username}/repos`;
 setTimeout(()=>{
  console.log("Fetching users repositories")
  callback(['repo1','repo2','repo3','repo4'])
 },2000)
}


function getFirstRepoBranches(username,repoName,callback){
 const url=`https://api.github.com/repos/${username}/${repoName}/branches`;
 setTimeout(()=>{
  console.log("Fetching first repos branches")
  callback(['main','develop','feature/google-auth'])
 },2000)
}
```

**Exercice 3**
Pour cette branches, recuperer tous les commits.

**Solution : CALLBACK HELL/CHRISTMAS TREE PROBLEM, because the indentations look like a Christmas tree**
```js
console.log("Before");
getUsers(1,function(user){
  getRepositories(user.githubUsername,function(repos){
    getFirstRepoBranches(user.githubUsername,repos[0],function(branches){
      getBranchCommits(branches[0],function(commits){
        console.log(commits)
      })
    })
  })
})
console.log("After");

function getUsers(id,callback){
  setTimeout(()=>{
    console.log("Reading a user from a database...")
    callback({id:id, githubUsername:'csev'})
  },2000)
}

function getRepositories(username,callback){
  const url=`https://api.github.com/users/${username}/repos`;
  setTimeout(()=>{
    console.log("Fetching users repositories")
    callback(['repo1','repo2','repo3','repo4'])
  },2000)
}


function getFirstRepoBranches(username,repoName,callback){
  const url=`https://api.github.com/repos/${username}/${repoName}/branches`;
  setTimeout(()=>{
    console.log("Fetching first repos branches")
    callback(['main','develop','feature/google-auth'])
  },2000)
}

function getBranchCommits(branch,callback){
  setTimeout(()=>{
    console.log(`Fetching all the commit for the branch ${branch}`)
    callback(['first-commit','2nd-commit'])
  },2000)
}

```

If the code above was synchronous, here is the result. It's not synchronous, but cleaner and more readable.
It doesn't have a deeply nested structure.

```js
console.log("Before")
const user=getUsers(id)
const repos=getRepositories(user.githubUsername)
const firstRepoBranches=getFirstRepoBranches(repos[0])
const commits=getBranchCommits(firstRepoBranches)
console.log("After")
```

### 4.2. Callback HELL solution with named functions - DON'T TEACH

```js
console.log("Before");
getUsers(1,function(user){
  getRepositories(user.githubUsername,function(repos){
    getFirstRepoBranches(user.githubUsername,repos[0],function(branches){
      getBranchCommits(branches[0],displayCommits)
    })
  })
})
console.log("After");

function getBranches(githubUsername){
 getBranches(githubUsername,displayCommits)
}
function displayCommits(commits){
 console.log(commits)
}

function getUsers(id,callback){
  setTimeout(()=>{
    console.log("Reading a user from a database...")
    callback({id:id, githubUsername:'csev'})
  },2000)
}

function getRepositories(username,callback){
  const url=`https://api.github.com/users/${username}/repos`;
  setTimeout(()=>{
    console.log("Fetching users repositories")
    callback(['repo1','repo2','repo3','repo4'])
  },2000)
}


function getFirstRepoBranches(username,repoName,callback){
  const url=`https://api.github.com/repos/${username}/${repoName}/branches`;
  setTimeout(()=>{
    console.log("Fetching first repos branches")
    callback(['main','develop','feature/google-auth'])
  },2000)
}

function getBranchCommits(branch,callback){
  setTimeout(()=>{
    console.log(`Fetching all the commit for the branch ${branch}`)
    callback(['first-commit','2nd-commit'])
  },2000)
}
```

## 5. Promises

```js
// Resolved
const p=new Promise((resolve,reject)=>{
  // Kick off some async work
  setTimeout(()=>{
    resolve(1) //pending => resolved,fullfilled
  },2000)
 
//  reject(new Error('message')
})

p.then(result=>console.log('Result : ',result))
```

```js
// Rejected
const p=new Promise((resolve,reject)=>{
 // Kick off some async work
 setTimeout(()=>{
  reject(new Error('message')) // pending => rejected
 },2000)

})

p.then(result=>console.log('Result : ',result)).catch(err=>console.log(err.message))
```


## 6. Replacing callback hell with promises

```js
console.log("Before");

getUsers(1)
  .then(user => getRepositories(user.githubUsername))
  .then(repos => getFirstRepoBranches(repos[0]))
  .then(branches => getBranchCommits(branches[0]))
  .then(commits => {
    console.log(commits);
    console.log("After");
  })
  .catch(error => console.error(error));

function getUsers(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, githubUsername: 'csev' });
    }, 2000);
  });
}

function getRepositories(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching users repositories");
      resolve(['repo1', 'repo2', 'repo3', 'repo4']);
    }, 2000);
  });
}

function getFirstRepoBranches(repoName) {
  const url = `https://api.github.com/repos/csev/${repoName}/branches`;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching first repos branches");
      resolve(['main', 'develop', 'feature/google-auth']);
    }, 2000);
  });
}

function getBranchCommits(branch) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Fetching all the commit for the branch ${branch}`);
      resolve(['first-commit', '2nd-commit']);
    }, 2000);
  });
}
```


## 7.Parallel promises

Here we don't have real concurrency or multithreading. The single thread is kicking multiple async operations at the same time.
 - It's start the first async operation, the thread is released
 - Then it's start the second one
We are not waiting for the result of the first async operation to be ready in order to kick off the second async operation.
The result is available through an array.

If one of the promises throws an error, the whole promise is rejected.
```js
const p1=new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log(`async task 1`);
  resolve(1);
 }, 2000);
});

const p2=new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log(`async task 2`);
  resolve(2);
 }, 2000);
});

Promise.all([p1,p2]).then(res=>{
 console.log(res)
}) // Will return a new promises that will be resolved the all the promises in this array are resolved.
```


## 7.Parallel promises race - Not necessary for the course.
When we want to do something as soon as one of the sync operation is fulfilled.
Ones failure does not affect the rest.

```js
const p1=new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log(`async task 1`);
  resolve(1);
 }, 2000);
});

const p2=new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log(`async task 2`);
  reject(new Error('Erère'));
 }, 2000);
});

Promise.race([p1,p2]).then(res=>{
 console.log(res)
}) 
```

## 8.Async Await
```js
async function main() {
  console.log("Before");

  try {
    const user = await getUsers(1);
    const repos = await getRepositories(user.githubUsername);
    const branches = await getFirstRepoBranches(repos[0]);
    const commits = await getBranchCommits(branches[0]);

    console.log(commits);
    console.log("After");
  } catch (error) {
    console.error(error);
  }
}

async function getUsers(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, githubUsername: 'csev' });
    }, 2000);
  });
}

async function getRepositories(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching users repositories");
      resolve(['repo1', 'repo2', 'repo3', 'repo4']);
    }, 2000);
  });
}

async function getFirstRepoBranches(repoName) {
  const url = `https://api.github.com/repos/csev/${repoName}/branches`;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching first repos branches");
      resolve(['main', 'develop', 'feature/google-auth']);
    }, 2000);
  });
}

async function getBranchCommits(branch) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Fetching all the commit for the branch ${branch}`);
      resolve(['first-commit', '2nd-commit']);
    }, 2000);
  });
}

main();

```

