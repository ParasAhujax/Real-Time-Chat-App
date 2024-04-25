
function getActiveUsers(activeUsers){
    return Array.from(activeUsers.values())
}
function addActiveUsers(userId,socketId,activeUsers){
    return activeUsers.set(userId,socketId);
}
function removeActiveUsers(socketId,activeUsers){
    return activeUsers.delete(socketId);
}
function isActive(userId,activeUsers){
    return activeUsers.has(userId);
}
module.exports = {
    getActiveUsers,
    addActiveUsers,
    removeActiveUsers,
    isActive
}