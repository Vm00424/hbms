public RoomDetail addRoom(RoomDetail room) throws HbmsException {
		Connection conn=DBConnection.getConnection();
		PreparedStatement preparedStatement=null;
		PreparedStatement preparedStatement2=null;
		ResultSet resultset=null;
		int queryResult=0;
		String roomId=null;
		
		try {
		preparedStatement=conn.prepareStatement(QueryMapper.INSERT_QUERY);
		
		preparedStatement.setString(1,room.getHotelId());
		preparedStatement.setString(3, room.getRoomNo());
		preparedStatement.setString(4,room.getRoomType());
		preparedStatement.setDouble(5, room.getPerNightRate());
		preparedStatement.setString(6, room.getAvailability());
		
		queryResult=preparedStatement.executeUpdate();
		
		preparedStatement2=conn.prepareStatement(QueryMapper.ROOMID_SEQUENCE);
		resultset=preparedStatement2.executeQuery();
		
		
		if(resultset.next()){
			roomId=resultset.getString(1);
			room.setRoomId(roomId);
		}
		if(queryResult==0){
			logger.error("insertion failed");
			throw new HbmsException("Inserting failed");
		}
		else{
			logger.info("successfully inserted");
			return room;
		}
	} catch (SQLException e) {
		logger.error(e.getMessage());
		throw new HbmsException("technical problem.Refer to log for details");
	}
	finally{
		
			try {
				if(resultset != null){
				resultset.close();
				}
				if(preparedStatement != null){
					preparedStatement.close();
				}
				if(preparedStatement2!= null){
					preparedStatement.close();
				}
				if(conn != null){
					conn.close();
				}
			} catch (SQLException sqlException) {
				logger.error(sqlException.getMessage());
				throw new HbmsException("Error in closing the database connections");
			}
		}
	}